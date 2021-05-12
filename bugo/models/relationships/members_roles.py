from bugo.extentions import db

members_roles = db.Table(
    "members_roles",
    db.Column("member_id", db.Text, db.ForeignKey("member.id"), primary_key=True),
    db.Column("role_id", db.Text, db.ForeignKey("role.id"), primary_key=True),
)
