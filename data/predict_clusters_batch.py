import sys
import os
import json
import pickle

# Obtenir le chemin absolu du fichier actuel
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "modele_kmeans.pkl")

# Charger le modèle avec le chemin absolu
with open(MODEL_PATH, "rb") as f:
    model_cluster = pickle.load(f)

# Lire JSON depuis stdin (envoyé par PHP)
data = json.loads(sys.stdin.read())

results = []

for arbre in data:
    haut = arbre['haut_tot']
    diam = arbre['tronc_diam']
    lon = arbre['longitude']
    lat = arbre['latitude']

    X = [[haut, diam, lon, lat]]
    cluster = int(model_cluster.predict(X)[0])

    results.append({
        "id_arbre": arbre['id_arbre'],
        "latitude": lat,
        "longitude": lon,
        "cluster": cluster
    })

print(json.dumps(results))
