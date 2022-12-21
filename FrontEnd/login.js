const formLogin = document.querySelector(".form-login");
const testBtnLogin = document.querySelector(".test-btn-login");
const loginConnexion = document.querySelector("#login-connexion");
const errorMessageConnexion = document.querySelector("#error-message-connexion");


function sendFormConnexion(e) {
  e.preventDefault();
  let emailValue = document.querySelector("#email").value;
  let passwordValue = document.querySelector("#password").value;
  let user = {
    email: emailValue,
    password: passwordValue,
  };

  fetch(`http://localhost:5678/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok === false) {
        errorMessageConnexion.textContent = "Erreur d'utilisateur ou de mot de passe, veuillez réessayer";
      } else {
        response.json().then((data) => {
          errorMessageConnexion.textContent = "Connexion établie, redirection...";
          errorMessageConnexion.style.color = "green";
          let token = data.token;
          localStorage.setItem("token Sophie Bluel", token);
          // Je récupère le token que je stocke dans le localStorage pour le récupèrer pendant les requêtes POST et DELETE
          location.href= "./accueil.html";
        });
      }
    })
    .catch((err) => {
      errorMessageConnexion.textContent = "Erreur d'API ou de connexion";
    });
}

loginConnexion.addEventListener("submit", sendFormConnexion);



