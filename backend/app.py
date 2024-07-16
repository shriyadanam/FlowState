from flask import Flask, request, jsonify, send_file
import networkx as nx
import matplotlib.pyplot as plt
import time, pandas as pd, random
import io
from flask_cors import CORS
import time, pandas as pd, random
import io
from flask_cors import CORS
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins, for development

#network_df = pd.read_csv('../data/network_dataset.csv')
ips_df = pd.read_csv('../backend/ip_data.csv')
df = pd.read_csv('./network_dataset.csv')


# @app.route('/', methods=['GET'])
# def send_next_request():
#     req = df.sample().to_dict(orient='records')[0]
#     print(req)

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
    print(json_response)

    return jsonify(json_response)


@app.route('/formsubmission', methods=['POST'])
def form_submission():
    data = request.json
    print("Data: ", data)
    return jsonify({'message': 'Data received successfully'}), 200


@app.route('/generate-graph')
def generate_graph():
    df = pd.read_csv('ip_data.csv', nrows=500)
    df_sample = df.sample(n=500, random_state=1)

    G = nx.DiGraph()

    print("reached!!!!!!!")

    for _, row in df_sample.iterrows():
        source_ip = row['Source.IP']
        destination_ip = row['Destination.IP']
        connection_type = row.get('ProtocolName', 'tcp')
        G.add_edge(source_ip, destination_ip, connection_type=connection_type)

    print("reached 2!!!!!!!")

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

    pos = nx.spring_layout(G, k=0.15, iterations=20)

    print("reached 3!!!!!!!")

    edge_colors = get_edge_colors(G)
    print("reached 4!!!!!!!")
    nx.draw_networkx_edges(G, pos, edgelist=G.edges(), edge_color=edge_colors, alpha=0.5) # FAILED HEREEEEE
    print("reached 4.5!!!!!!!")
    nx.draw_networkx_labels(G, pos, font_size=8, font_family='sans-serif', font_color='black')
    print("reached 5!!!!!!!")
    edge_labels = get_edge_labels(G)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=6, label_pos=0.5)

    plt.title('IP Connections Network Graph', fontsize=15)
    plt.axis('off')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    return send_file(img, mimetype='image/png')

@app.route('/network-counts', methods=['GET'])
def send_network_counts():
    return jsonify(df.groupby('attack').size().to_dict())
