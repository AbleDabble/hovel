import functools
import yt_dlp as yt

from flask import (
    Blueprint, jsonify, g, request
)

from .models.model import db
from .models.videos import Videos

bp = Blueprint('yt', __name__, url_prefix='/yt')

def get_filesize(format):
    if format['filesize'] is None:
        return format.get('filesize_approx', 0)
    else:
        return format.get('filesize', 0)


@bp.route('/download', methods=["GET", "POST"])
def download():
    """
    GET: 
        PARAMETERS:
            url - url to video 
        RETURNS: JSON of available file formats
    POST:
        PARAMETERS:
            url - url to video
            format - format_id of video to download
        RETURNS: JSON indicating success or failure along with the name of the saved file
    """
    if request.method == "GET":
        youtube = yt.YoutubeDL()
        info = youtube.extract_info(request.args["url"], download=False)
        formats = []
        for format in info['formats']:
            if format.get('filesize', 0) == 0:
                continue
            new_format = {
                'format_id': format['format_id'],
                'ext': format['ext'],
                'acodec': format['acodec'],
                'vcodec': format['vcodec'],
                'filesize': get_filesize(format)
            }
            formats.append(new_format)
        response = jsonify(formats)
        response.headers.add('Access-Control-Allow-Origin', '*') 
        return response
    
    if request.method == "POST":
        options = {
            'outtmpl': '../frontend/public/videos/%(title)s-%(format_id)s.%(ext)s'
        }
        response_tmpl = "%(title)s-%(format_id)s.%(ext)s"

        if 'format' in request.form:
            format_id = request.form['format']
            options['format'] = format_id
            youtube = yt.YoutubeDL(options)
        else:
            youtube = yt.YoutubeDL(options)

        try:
            info = youtube.extract_info(request.form['url'])
            filename = response_tmpl % {
                "title": info['title'],
                "format_id": info['format_id'],
                "ext": info['ext']
            }
                
            video = Videos.query.filter_by(filename=filename).first()
            if video is None:
                video = Videos(
                    request.form['url'],
                    filename,
                    get_filesize(info),
                    info['format_id'],
                    info['ext'],
                    info['title']
                )
                db.session.add(video)
                db.session.commit()

            response = {"success": True, "filename": filename}
            response = jsonify(response)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as e:
            print(e)
            response = jsonify({"success": False}) 
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@bp.route('/videos', methods=["GET"])
def videos():
    response = Videos.query.all()
    response = jsonify([r.serialize for r in response])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/search', methods=["GET"])
def search():
    """
    Returns a list of videos based on search results
    """
    pass