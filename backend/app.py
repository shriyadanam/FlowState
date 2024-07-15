from flask import Flask, request, jsonify
import time, pandas as pd, random

app = Flask(__name__)
df = pd.read_csv('../data/network_dataset.csv')

@app.route('/', methods=['GET'])
def send_next_request():
    req = df.sample().to_dict(orient='records')[0]
    print(req)

while(True):
    time.sleep(random.randint(1, 5))
    send_next_request()