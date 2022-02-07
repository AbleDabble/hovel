from sympy import re
import yt_dlp as yt
from flask import Flask, request
from flask import jsonify

app = Flask(__name__)

@app.route("/download", methods=["GET", "POST"])
def download():
    """
    GET:
    params: 
        Required:
            url
        optional:
            None
    returns:
        json of available formats
    POST:
    params:
        Required:
            url
        optional:
            format_id
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
                'filesize': format['filesize']
            }
            formats.append(new_format)
        return jsonify(formats)
    if request.method == "POST":
        options = {
            'outtmpl': 'videos/%(title)s-%(format_id)s.%(ext)s'
        }
        if 'format' in request.form:
            format_id = request.form['format']
            options['format'] = format_id
            youtube = yt.YoutubeDL(options)
        else:
            youtube = yt.YoutubeDL(options)
        try:
            youtube.extract_info(request.form['url'])
            return jsonify({"Success": True})
        except Exception as e:
            print(e)
            return jsonify({"Success": False})
        

app.run()