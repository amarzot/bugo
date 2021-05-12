from bugo.extentions import db
from bugo.models.relationships.members_roles import members_roles


class Member(db.Model):
    __table_args__ = (db.UniqueConstraint("group_id", "user_id"),)
    id = db.Column(db.Text, primary_key=True)
    user_id = db.Column(db.Text, db.ForeignKey("user.id"))
    group_id = db.Column(db.Text, db.ForeignKey("group.id"))
    name = db.Column(db.Text, nullable=True)

    roles = db.relationship("Role", secondary=members_roles, backref="members")

    def serialize(self):
        return {"user_id": self.user_id, "group_id": self.group_id, "name": self.name}
