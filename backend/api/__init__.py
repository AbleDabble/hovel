import os 
from flask import Flask 

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object('config.Config')
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_maping(test_config)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from .models.model import db
    db.init_app(app)

    from . import yt
    app.register_blueprint(yt.bp)

    @app.cli.command()
    def createdb():
        db.create_all()

    return app