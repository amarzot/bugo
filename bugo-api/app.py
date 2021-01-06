from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)

# Set the secret key to sign the JWTs with
app.config['JWT_SECRET_KEY'] = 'bugo-super-secret-key'  

jwt = JWTManager(app)
cors = CORS(app)  # By default allow CORS for all domains on all routes

import api_v1

app.register_blueprint(api_v1.bp, url_prefix='/api')


if __name__ == '__main__':
    app.run(host="0.0.0.0")