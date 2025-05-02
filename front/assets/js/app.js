document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('site-header');
  if(header)header.innerHTML='<nav><a href="index.html">Accueil</a><a href="add_tree.html">Ajouter un arbre</a><a href="view.html">Visualiser</a><a href="ia.html">IA</a><a href="search.html">Search</a></nav>';
  
  const footer=document.getElementById('site-footer');
  if(footer)footer.innerHTML=`<p>&copy; ${new Date().getFullYear()} Projet Web de Pierre DAUGUET, Thomas ESNAULT et Ouiam MANSOURI</p>`;
});

async function apiFetch(ep,opts={}){const r=await fetch('api/'+ep, {headers:{'Content-Type':'application/json'},...opts});if(!r.ok)throw new Error(r.statusText);return r.json();}