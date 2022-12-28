modalGallery.addEventListener('click', (e) => {
  console.log(e.target);
  if(e.target.className === "btn-delete") {
  console.log(e.target.parentElement.getAttribute('index'));
  const indexCard = parseInt(e.target.parentElement.getAttribute('index'));
  const modalCard = e.target.parentElement;
  deleteData(modalCard, indexCard)
  }
});

function deleteData(modalCardDel, indexCardDel) {
  fetch(`http://localhost:5678/api/works/${indexCardDel}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const figurePortfolio = document.querySelectorAll(".figure-portfolio");
      if (!response.ok) {
        alert(
          "Vous n'êtes pas autorisé à supprimer un élément, si vous avez les droits, veuillez vous reconnnecter s'il vous plaît."
        );
        console.log(
          "Vous n'êtes pas autorisé à supprimer un élément, si vous avez les droits, veuillez vous reconnnecter s'il vous plaît."
        );
      } else {
        console.log("requête supprimé effectuée");
        //Une autre solution est d'appeler mon API, qui appelle les fonctions createCards() et createModalCards() qui suppriment les anciennnes données avec un innertHTML = ""; et recréent mes cards avec un nouvel appel API ;
        // appelApi1();
        modalCardDel.remove();
        figurePortfolio.forEach((elem) => {
          if (parseInt(elem.getAttribute("index")) === indexCardDel) {
            elem.remove();
          }
        });
      }
    })
    .catch(() => {
      alert("Erreur de connexion");
    });
};

