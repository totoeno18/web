// Fichier : assets/js/add_tree.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-tree-form");
  const messageElement = document.getElementById("add-tree-message");

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = {
          hauteur: parseFloat(form.height_total.value),
          diametre: parseFloat(form.trunk_diameter.value),
          latitude: parseFloat(form.latitude.value),
          longitude: parseFloat(form.longitude.value),
          quartier: form.quartier.value,
          secteur: form.secteur.value,
          age: parseFloat(form.age.value),
          etat: form.state.value
      };

      try {
          const response = await fetch("http://localhost:8080/api/trees", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          });

          if (!response.ok) {
              throw new Error(`Erreur serveur : ${response.status}`);
          }

          const result = await response.json();
      } catch (error) {
          console.error("Erreur lors de l'ajout de l'arbre :", error);
          messageElement.textContent = "Erreur lors de l'ajout de l'arbre. Veuillez réessayer.";
          messageElement.style.color = "red";
          return;
      }
  });
});
