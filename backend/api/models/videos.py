from flask_sqlalchemy import SQLAlchemy
from .model import db

class Videos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(255), nullable=False)
    filename = db.Column(db.String(255), unique=True, nullable=False)
    filesize = db.Column(db.Integer, nullable=False)
    format_id = db.Column(db.String(80), nullable=False)
    ext = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    

    def __init__(self, link, filename, filesize, format_id, ext, title):
        self.link = link
        self.filename = filename
        self.filesize = filesize
        self.format_id = format_id
        self.ext = ext
        self.title = title

