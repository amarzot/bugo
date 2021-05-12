import os

ENV = os.environ.get("FLASK_ENV", default="production")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite://")
SECRET_KEY = os.environ.get("SECRET_KEY")
SQLALCHEMY_TRACK_MODIFICATIONS = False
