import uuid

from flask import jsonify, request
from flask_jwt_extended import (
    create_access_token,
    jwt_refresh_token_required,
    create_refresh_token,
    get_jwt_identity,
)


from bugo.extentions import db
from bugo.models import User
from bugo import security
from bugo.api.blueprint import api_blueprint as api_bp


@api_bp.route("/register", methods=["POST"])
def register():
    if not request.json:
        return jsonify({"msg": "JSON body required"}), 400

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    password_hash = security.context.hash(password)

    user_exists = User.query.filter_by(name=username).first() is not None

    user = User(name=username, password_hash=password_hash, id=str(uuid.uuid4()))

    if user_exists:
        return jsonify({"msg": "username already taken"}), 422

    db.session.add(user)
    db.session.commit()

    ret = {
        "access_token": create_access_token(identity=user.id),
        "refresh_token": create_refresh_token(identity=user.id),
    }

    return jsonify(ret), 201


@api_bp.route("/login", methods=["POST"])
def login():
    if not request.json:
        return jsonify({"msg": "JSON body required"}), 400

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(name=username).first()

    stored_hash = None
    if user is not None:
        stored_hash = user.password_hash

    pw_valid = security.context.verify(password, stored_hash)

    if not pw_valid:
        return jsonify({"error": "wrong username or password"}), 401

    ret = {
        "access_token": create_access_token(identity=user.id),
        "refresh_token": create_refresh_token(identity=user.id),
    }
    return jsonify(ret), 200


@api_bp.route("/refresh", methods=["POST"])
@jwt_refresh_token_required
def refresh():
    user_id = get_jwt_identity()
    ret = {"access_token": create_access_token(identity=user_id)}
    return jsonify(ret), 200
