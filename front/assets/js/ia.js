/* Endpoints Flask */
const CLUSTER_URL = 'http://localhost:5000/predict';
const AGE_URL     = 'http://localhost:5000/predict_age';

document.addEventListener('DOMContentLoaded', () => {
  const diam = document.getElementById('diam-input');
  const haut = document.getElementById('haut-input');
  const lon  = document.getElementById('lon-input');
  const lat  = document.getElementById('lat-input');
  const res  = document.getElementById('result');

  /* ----- Cluster ----- */
  document.getElementById('cluster-btn').addEventListener('click', async () => {
    if (!checkRequired()) return;
    res.textContent = 'Cluster en cours…';
    try {
      const payload = [{
        tronc_diam: Number(diam.value),
        haut_tot:   Number(haut.value),
        longitude:  Number(lon.value),
        latitude:   Number(lat.value)
      }];
      const data = await fetch(CLUSTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      res.textContent = `Cluster : ${data[0].cluster}`;
    } catch (e) {
      res.textContent = 'Erreur : ' + e;
    }
  });

  /* ----- Âge ----- */
  document.getElementById('age-btn').addEventListener('click', async () => {
    if (!checkRequired()) return;
    res.textContent = 'Prédiction d’âge…';
    try {
      const payload = [{
        tronc_diam: Number(diam.value),
        haut_tot:   Number(haut.value),
        longitude:  Number(lon.value),
        latitude:   Number(lat.value)
      }];
      const data = await fetch(AGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      res.textContent = `Âge estimé : ${data[0].age_estime.toFixed(1)} ans`;
    } catch (e) {
      res.textContent = 'Erreur : ' + e;
    }
  });

  function checkRequired() {
    if (!diam.value || !haut.value || !lon.value || !lat.value) {
      alert('Remplis toutes les valeurs.');
      return false;
    }
    return true;
  }
});
