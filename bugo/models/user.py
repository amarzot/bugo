from sqlalchemy.ext.associationproxy import association_proxy

from bugo.extentions import db


class User(db.Model):
    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)

    members = db.relationship("Member", backref="user")
    groups = association_proxy("members", "group")

    def serialize(self):
        return {"id": self.id, "name": self.name}
