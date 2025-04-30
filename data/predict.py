import sys
import os
import json
import pickle

# ✅ Récupère les paramètres envoyés par PHP
haut = float(sys.argv[1])
diam = float(sys.argv[2])
lon = float(sys.argv[3])
lat = float(sys.argv[4])

# ✅ Chemin absolu du dossier courant
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ✅ Charger les modèles .pkl
with open(os.path.join(BASE_DIR, "abre_age_predictor_Random_Forest.pkl"), "rb") as f:
    model_age = pickle.load(f)

with open(os.path.join(BASE_DIR, "arbre_chute_predictor_RandmForest.pkl"), "rb") as f:
    model_risque = pickle.load(f)

with open(os.path.join(BASE_DIR, "modele_kmeaans.pkl"), "rb") as f:
    model_cluster = pickle.load(f)

# ✅ Vecteur de prédiction
X = [[haut, diam, lon, lat]]

# ✅ Prédictions
age = model_age.predict(X)[0]
risque = model_risque.predict(X)[0]
cluster = model_cluster.predict(X)[0]

# ✅ Réponse JSON
result = {
    "age": round(age),
    "risque": "Élevé" if risque == 1 else "Faible",
    "cluster": int(cluster)
}

print(json.dumps(result))
