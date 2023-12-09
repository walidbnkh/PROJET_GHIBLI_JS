// URL de l'API Studio Ghibli
const API_GHIBLI = "https://ghibliapi.vercel.app/films";

fetch(API_GHIBLI) // Utilisation de la fonction fetch pour effectuer une requête
  .then((RESULTAT) => {
    if (!RESULTAT.ok) {
      // Vérifier si la requête a réussi
      throw new Error(`Échec de la requête,  statut : ${RESULTAT.status}`);
    }

    return RESULTAT.json(); // JSON
  })
  .then((data) => {
    const listeRealisateurs = document.getElementById("directors");
    const listeFilmsRealisateurs =
      document.getElementById("directorsfilmsList");
    const listeFilmsParRealisateur = document.getElementById("filmsBy");

    // Regrouper les films par réalisateur
    let filmsParRealisateur = data.reduce(function (acc, realisateur) {
      if (!acc[realisateur.director]) acc[realisateur.director] = [];
      acc[realisateur.director].push(realisateur);
      return acc;
    }, {});

    // Extraire la liste des réalisateurs
    let donneesRealisateurs = [];
    for (let cle in filmsParRealisateur) {
      donneesRealisateurs.push(cle);
    }

    // Insérer les films dans une liste
    const realisateurCible = "Hayao Miyazaki";
    listeFilmsParRealisateur.insertAdjacentHTML(
      "beforeend",
      data
        .map(
          (film) =>
            `<li class="${
              film.director === realisateurCible ? "selectionnee" : ""
            }">
        ${film.title} : ${film.director}
      </li>`
        )
        .join("")
    );

    // Insérer la liste des réalisateurs
    listeRealisateurs.insertAdjacentHTML(
      "beforeend",
      donneesRealisateurs
        .map((realisateur) => `<li>${realisateur}</li>`)
        .join("")
    );

    // Insérer les films regroupés par réalisateur
    listeFilmsRealisateurs.insertAdjacentHTML(
      "beforeend",
      donneesRealisateurs
        .map(
          (realisateur) =>
            `<li>
        ${realisateur}
        <ul>
          ${filmsParRealisateur[realisateur]
            .map((film) => `<li>${film.title}</li>`)
            .join("")}
        </ul>
      </li>`
        )
        .join("")
    );
  })
  .catch((erreur) => {
    console.error(`Erreur lors de la récupération  : ${erreur.message}`);
  });
