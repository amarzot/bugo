from bugo.extentions import db


class Group(db.Model):
    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False)

    members = db.relationship("Member", backref="group")
    roles = db.relationship("Role", backref="group")

    def serialize(self):
        return {"id": self.id, "name": self.name}
