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
            response = {"success": True, "filename": filename}
            print("===[RESPONSE]===", response)
            response = jsonify(response)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as e:
            print(e)
            response = jsonify({"success": False}) 
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        
app.run(host="0.0.0.0")