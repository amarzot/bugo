from flask import Flask

from bugo.extentions import db, jwt
from bugo import api


def create_app(config_object="bugo.config"):
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()

    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    app.register_blueprint(api.api_blueprint)
    return None
