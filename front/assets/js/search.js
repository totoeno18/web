/* ----------------- CONFIG ----------------- */
const API_URL  = 'http://localhost:8080/api/trees';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FpbGxvdXhlbG1hcmxvdSIsImEiOiJjbWEzb2l5dmUyMzFtMmtzZDNjcmt0MDJ1In0.yODitvwE981IY0VGPm320w';
const MAP_CENTER   = [3.29, 49.85];   // Saint-Quentin
let SUFFIX = ''; // suffixe de l'URL pour filtrer les arbres

/* -------------- INITIALISATION ------------ */
mapboxgl.accessToken = MAPBOX_TOKEN;
let map;                   // instance Mapbox
const markerDict = {};     // id_arbre → marker



document.getElementById('filter-form').addEventListener("submit", async (event) => {
  event.preventDefault();

  const quartier = document.getElementById('quartier-input').value.trim();
  const secteur = document.getElementById('secteur-input').value.trim();
  const etat = document.getElementById('etat-input').value.trim();
  
  if(quartier) {
    SUFFIX = '/quartier?quartier=' + quartier;
  } else if(secteur) {
    SUFFIX = '/secteur?secteur=' + secteur; 
  } else if(etat) {
    SUFFIX = '/etat?etat=' + etat;
  }

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: MAP_CENTER,
    zoom: 12
  });

  /* --- Chargement GeoJSON --- */
  try {
    let json
    if (SUFFIX != '') {
      json = await fetch(API_URL+SUFFIX).then(r => r.json());
      console.log(json);
      console.log(`Chargé ${json.length} arbres`);
    }
    populateTable(json);
    plotMarkers(json);
  } catch (err) {
    console.error('Erreur de chargement JSON :', err);
  }
});

/* ------------ TABLEAU HTML ---------------- */
function populateTable(features) {
  const tbody = document.querySelector('#tree-table tbody');
  tbody.innerHTML = '';

  features.forEach((p, idx) => {
    const id = p.identifiant ?? idx;

    const tr = document.createElement('tr');
    tr.dataset.id = id;
    tr.innerHTML = `
      <td>${id}</td>
      <td>${p.quartier || ''}</td>
      <td>${p.hauteur     || ''}</td>
      <td>${p.diametre   || ''}</td>
      <td>${p.longitude}, ${p.latitude}</td>
    `;
    tbody.appendChild(tr);

    /* clic → zoom + popup */
    tr.addEventListener('click', () => {
      const m = markerDict[id];
      if (m) {
        map.flyTo({ center: m.getLngLat(), zoom: 15, essential: true });
        m.togglePopup();
      }
      highlightRow(id);
    });
  });
}

/* ------------- MARQUEURS ------------------ */
function plotMarkers(features) {
  features.forEach((p, idx) => {
    const [lon, lat] = [p.longitude, p.latitude];
    const id = p.identifiant ?? idx;
    
    const marker = new mapboxgl.Marker({ color: '#2e7d32' })
      .setLngLat([lon, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <strong>${p.secteur || 'Secteur ?'}</strong><br>
        Quartier : ${p.quartier || '—'}<br>
        Hauteur : ${p.hauteur || '?'} m
      `))
      .addTo(map);

    markerDict[id] = marker;

    /* survol marker → surligne ligne */
    marker.getElement().addEventListener('mouseenter', () => highlightRow(id));
    marker.getElement().addEventListener('mouseleave', () => highlightRow(null));
  });
}

/* ------------- HIGHLIGHT ------------------ */
function highlightRow(id) {
  document.querySelectorAll('#tree-table tbody tr').forEach(tr => {
    tr.classList.toggle('active', id && tr.dataset.id == id);
  });
}
