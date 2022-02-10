import os

class Config(object):
    DEBUG = False
    DEVELOPMENT = False
    SECRET_KEY = 'dev'
    SQLALCHEMY_DATABASE_URI = 'postgresql://base:base@localhost/hovel'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
