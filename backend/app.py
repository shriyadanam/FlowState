from flask import Flask, request, jsonify, send_file
import networkx as nx
import matplotlib.pyplot as plt
import time, pandas as pd, random, io
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
import joblib

import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model_filename = './model/random_forest_model.pkl'
loaded_model = joblib.load(model_filename)

label_encoder_filename = './model/label_encoder.pkl'
loaded_label_encoder = joblib.load(label_encoder_filename)


ips_df = pd.read_csv('../backend/data/ip_data.csv')
network_df = pd.read_csv('../backend/data/network_dataset.csv')


# Get the top IPs
@app.route('/topips', methods=['GET'])
def top_ips():
    # Extracting and counting source & destination IPs
    source_counts = ips_df['Source.IP'].value_counts().head(5).index.tolist()
    dest_counts = ips_df['Destination.IP'].value_counts().head(5).index.tolist()

    # Creating JSON response
    json_response = {
        "Top_Source_IPs": source_counts,
        "Top_Destination_IPs": dest_counts
    }
    return jsonify(json_response)


# Submitting the Form with Traffic Values
@app.route('/formsubmission', methods=['POST'])
def form_submission():
    data = request.json
    print("Data: ", data)
    # return jsonify({'message': 'Data received successfully'}), 200

    # Example: Extract relevant features from form submission
    duration = data['Duration']
    src_bytes = data['SourceBytes']
    num_file_creations = data['FileCreations']
    num_shells = data['Shells']
    service = data['Service']
    num_failed_logins = data['FailedLogins']

    # Create a DataFrame from the extracted data
    input_data = pd.DataFrame({
        'duration': [duration],
        'src_bytes': [src_bytes],
        'num_file_creations': [num_file_creations],
        'num_shells': [num_shells],
        'service': [service],
        'num_failed_logins': [num_failed_logins]
    })

    # Perform any necessary preprocessing (e.g., encoding categorical features)
    input_data['service'] = loaded_label_encoder.transform(input_data['service'])

    # Make predictions using the loaded model
    prediction = loaded_model.predict(input_data)

    # Return prediction as JSON response
    return jsonify({'prediction': prediction[0]}), 200


# Generating the Flow Packet Visualization Graph
@app.route('/generate-graph')
def generate_graph():
    df = pd.read_csv('../backend/data/ip_data.csv', nrows=1000)
    df_sample = df.sample(n=100, random_state=1)

    G = nx.DiGraph()

    for _, row in df_sample.iterrows():
        source_ip = row['Source.IP']
        destination_ip = row['Destination.IP']
        connection_type = row.get('ProtocolName', 'tcp')
        G.add_edge(source_ip, destination_ip, connection_type=connection_type)

    def get_edge_colors(G):
        edge_colors = []
        for u, v, data in G.edges(data=True):
            connection_type = data.get('connection_type', 'tcp')
            if connection_type == 'HTTP_PROXY':
                edge_colors.append('green')
            elif connection_type == 'HTTP':
                edge_colors.append('blue')
            elif connection_type == 'SSL':
                edge_colors.append('red')
            else:
                edge_colors.append('gray')
        return edge_colors

    def get_edge_labels(G):
        edge_labels = {}
        for u, v, data in G.edges(data=True):
            connection_type = data.get('connection_type', 'tcp')
            edge_labels[(u, v)] = connection_type
        return edge_labels

    pos = nx.spring_layout(G, k=0.5, iterations=50)

    edge_colors = get_edge_colors(G)

    fig, ax = plt.subplots(facecolor='black')
    ax.set_facecolor('black')

    nx.draw_networkx_edges(G, pos, edgelist=G.edges(), edge_color=edge_colors, alpha=0.5)
    nx.draw_networkx_labels(G, pos, font_size=8, font_family='sans-serif', font_color='white', ax=ax)
    edge_labels = get_edge_labels(G)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=6, label_pos=0.5, font_color='white', ax=ax, bbox=dict(facecolor='black', edgecolor='none'))

    plt.title('IP Connections Network Graph', fontsize=15, color='white')
    plt.axis('off')

    img = io.BytesIO()
    plt.savefig(img, format='png', facecolor = fig.get_facecolor())
    img.seek(0)
    return send_file(img, mimetype='image/png')


# Getting the attack counts
@app.route('/network-counts', methods=['GET'])
def send_network_counts():
    return jsonify(network_df.groupby('attack').size().to_dict())

if __name__ == '__main__':
    app.run(debug=True)