import uuid

from flask import jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from bugo.extentions import db
from bugo.models import User, Group, Member
from bugo.api.blueprint import api_blueprint as api_bp


def valid_group_description(group_description):
    return group_description and group_description["name"]


@api_bp.route("/group", methods=["POST"])
@jwt_required
def create_group():
    group_description = None
    if request.json:
        group_description = request.json

    if not valid_group_description(group_description):
        return jsonify({"msg": "valid JSON group description required"}), 400

    user_id = get_jwt_identity()
    founder = User.query.filter_by(id=user_id).first()
    group_id = str(uuid.uuid4())
    member_id = str(uuid.uuid4())
    member = Member(
        id=member_id, user_id=founder.id, group_id=group_id, name=founder.name
    )
    group = Group(name=group_description["name"], id=group_id, members=[member])

    db.session.add(group)
    db.session.commit()

    return jsonify(group.serialize()), 200


@api_bp.route("/group/<group_id>/join", methods=["GET"])
@jwt_required
def join_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.filter_by(id=group_id).first()

    if not group:
        return jsonify({"msg": "No group with that id, or wrong permisions"}), 400

    user = User.query.filter_by(id=user_id).first()
    member_id = str(uuid.uuid4())
    member = Member(id=member_id, user_id=user.id, group_id=group.id, name=user.name)
    group.members.append(member)
    db.session.commit()

    return jsonify(member.serialize()), 200


@api_bp.route("/group/<group_id>", methods=["GET"])
@jwt_required
def get_group(group_id):
    group = Group.query.filter_by(id=group_id).first()

    if not group:
        return jsonify({"msg": "No group with that id, or wrong permisions"}), 400

    return jsonify(group.serialize()), 200


@api_bp.route("/group/<group_id>/members", methods=["GET"])
@jwt_required
def get_group_memebers(group_id):
    group = Group.query.filter_by(id=group_id).first()

    if not group:
        return jsonify({"msg": "No group with that id, or wrong permisions"}), 400

    memebers = [m.serialize() for m in group.members]

    return jsonify(memebers), 200
