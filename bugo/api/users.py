from flask import jsonify
from flask.views import MethodView
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from bugo.api.blueprint import api_blueprint as api_bp
from bugo.models import User


@api_bp.route("/user/<user_id>", methods=["GET"])
@jwt_required
def get_user(user_id):
    self_id = get_jwt_identity()
    if self_id != user_id:
        return jsonify({"msg": "Only able to request your own user info for now"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify(user.serialize()), 200


@api_bp.route("/user/<user_id>/members", methods=["GET"])
@jwt_required
def get_users_members(user_id):
    self_id = get_jwt_identity()
    if self_id != user_id:
        return jsonify({"msg": "Only able to request your own user info for now"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify(user.serialize()), 200
