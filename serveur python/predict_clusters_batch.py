from __future__ import annotations
import pickle
from pathlib import Path
from typing import Any, Dict, List

from flask import Flask, jsonify, request
from flask_cors import CORS

# ---------------------------------------------------------------------
# Chargement des modèles
# ---------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent

MODEL_CLUSTER = BASE_DIR / "modele_kmeans.pkl"
MODEL_AGE     = BASE_DIR / "arbre_age_predictor_Random_forest.pkl"          # ← ajoute ton fichier

def load_model(path: Path):
    with path.open("rb") as f:
        return pickle.load(f)

kmeans     = load_model(MODEL_CLUSTER)
age_model  = load_model(MODEL_AGE)

# ---------------------------------------------------------------------
# Logique métier
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def cluster_for(arbre: Dict[str, Any]) -> int:
    X = [[arbre["haut_tot"], arbre["tronc_diam"]]]             # 2 features
    return int(kmeans.predict(X)[0])

def age_for(arbre: Dict[str, Any]) -> float:
    X = [[arbre["haut_tot"], arbre["tronc_diam"],              # 4 features
          arbre["longitude"], arbre["latitude"]]]
    return float(age_model.predict(X)[0])
# ---------------------------------------------------------------------


def enrich_with_cluster(arbre: Dict[str, Any]) -> Dict[str, Any]:
    return {**arbre, "cluster": cluster_for(arbre)}

def enrich_with_age(arbre: Dict[str, Any]) -> Dict[str, Any]:
    return {**arbre, "age_estime": age_for(arbre)}

# ---------------------------------------------------------------------
# Factory Flask
# ---------------------------------------------------------------------
def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    @app.route("/predict", methods=["POST"])
    def predict_cluster():
        data: List[Dict[str, Any]] = request.get_json(force=True, silent=True) or []
        return jsonify([enrich_with_cluster(a) for a in data])

    @app.route("/predict_age", methods=["POST"])
    def predict_age():
        data: List[Dict[str, Any]] = request.get_json(force=True, silent=True) or []
        return jsonify([enrich_with_age(a) for a in data])

    return app

app = create_app()

# ---------------------------------------------------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
