from bugo.extentions import db


class Role(db.Model):
    __table_args__ = (db.UniqueConstraint("group_id", "name"),)
    id = db.Column(db.Text, primary_key=True)
    group_id = db.Column(db.Text, db.ForeignKey("group.id"), primary_key=True)
    name = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {"id": self.id, "name": self.name}
