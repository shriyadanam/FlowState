from flask import Flask, jsonify
import time, pandas as pd, random
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
df = pd.read_csv('./network_dataset.csv')

@app.route('/network-counts', methods=['GET'])
def send_network_counts():
    return jsonify(df.groupby('attack').size().to_dict())