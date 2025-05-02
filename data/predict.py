# fichier : app.py
from flask import Flask, request, jsonify
import pickle
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Chargement des modèles
with open(os.path.join(BASE_DIR, "abre_age_predictor_Random_Forest.pkl"), "rb") as f:
    model_age = pickle.load(f)

with open(os.path.join(BASE_DIR, "arbre_chute_predictor_RandmForest.pkl"), "rb") as f:
    model_risque = pickle.load(f)

with open(os.path.join(BASE_DIR, "modele_kmeaans.pkl"), "rb") as f:
    model_cluster = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    haut = float(data['hauteur'])
    diam = float(data['diametre'])
    lon = float(data['longitude'])
    lat = float(data['latitude'])

    X = [[haut, diam, lon, lat]]

    # Prédictions
    age = model_age.predict(X)[0]
    risque = model_risque.predict(X)[0]
    cluster = model_cluster.predict(X)[0]

    return jsonify({
        "age": round(age),
        "risque": "Élevé" if risque == 1 else "Faible",
        "cluster": int(cluster)
    })

if __name__ == "__main__":
    app.run(port=5001)
