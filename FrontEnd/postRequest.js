const btnToDataForm = document.querySelector(".btn-to-postdata");
const formAddProject = document.querySelector(".form-add-project");
const btnToPostData = document.querySelector(".btn-to-postdata");
const btnBackModal = document.querySelector(".btn-back-modal");

const divInsideModalDelete = document.querySelector(".div-inside-modal-delete");
const divInsideModalPost = document.querySelector(".div-inside-modal-post ");

const imgDataForm = document.querySelector("#image-postform");
const titleDataForm = document.querySelector("#title-postform");
const categoryDataForm = document.querySelector("#category-postform");
const btnLabel = document.querySelector('#btn-label');
const btnValidePostform = document.querySelector(".btn-valide-postform");
const responsePostRequest = document.querySelector(".response-post-request");




btnToPostData.addEventListener("click", () => {
  divInsideModalDelete.classList.add("display-none");
  divInsideModalPost.classList.remove("display-none");
  btnBackModal.classList.remove("display-none");
});

btnBackModal.addEventListener("click", () => {
  divInsideModalDelete.classList.remove("display-none");
  divInsideModalPost.classList.add("display-none");
  btnBackModal.classList.add("display-none");
});

const imgToDisplay = document.querySelector(".image-from-input");

imgDataForm.addEventListener("change", () => readURL(imgDataForm));



function readURL(input) {
  console.log("readurl appelé");

  console.log(input);
  console.log(input.files[0]);

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    console.log(reader);

    reader.onload = function (e) {
      console.log(e.target);
      const dataImgToPost = e.target.result;
      imgToDisplay.src = dataImgToPost;
      console.log(e.target.result);
      console.log(reader);
      imgToDisplay.classList.add("img-h100-abs");
    };
    reader.readAsDataURL(input.files[0]);
    btnLabel.classList.add("display-none");
  }
};


const allInputs = document.querySelectorAll(
  "#image-postform, #title-postform, #category-postform"
);


allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    console.log(input);
    console.log(input.value);
    console.log(allInputs[1].value.length);
    console.log(allInputs[2].value.length);

    if (
      allInputs[0].value.length > 0 &&
      allInputs[1].value.length > 0 &&
      allInputs[2].value.length > 0
    ) {
      btnValidePostform.classList.remove("btn-unvalide");
    } else {
      btnValidePostform.classList.add("btn-unvalide");
    }
  });
});

formAddProject.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);

  console.log(imgDataForm);

  const urlToTest = imgDataForm.files[0];
  const urlToPost = imgDataForm.files[0];
  const imgDataFormValToPost = imgToDisplay.src;

  const titleDataFormVal = titleDataForm.value;
  const categoryDataFormVal = categoryDataForm.value;
  const categoryDataFormTxt = categoryDataForm.options[categoryDataForm.selectedIndex].text;

  console.log("formulaire envoyé");

  console.log(imgDataFormValToPost);

  callForm(urlToPost, titleDataFormVal, categoryDataFormVal);
});

function callForm(file, title, categoryVal) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("image", file);
  formData.append("category", categoryVal);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => res.json())

    .then((data) => {
      responsePostRequest.textContent = "Données envoyées avec succès";
      responsePostRequest.style.color = "green";


      setTimeout(() => {
        console.log(data.imageUrl);
        console.log(data.title);

        divInsideModalPost.classList.add("display-none");
        divInsideModalDelete.classList.remove("display-none");
        responsePostRequest.textContent = "";

        imgToDisplay.src = "./assets/icons/image-regular.svg";
        imgToDisplay.classList.remove("img-h100-abs");
        btnLabel.classList.remove("display-none");

        imgDataForm.value = "";
        titleDataForm.value = "";
        categoryDataForm.value = "1";
        btnValidePostform.classList.add("btn-unvalide");
        btnBackModal.classList.add("display-none");
        createProject(data.title, data.imageUrl, data.id, data.categoryId);
        filterFinal();
      }, 1000);
    })

    .catch((err) => {
      console.log(err);
      responsePostRequest.textContent =
        "Erreur dans l'envoie de données, vérifier que vous êtes bien connecté en tant qu'administrateur";
      responsePostRequest.style.color = "red";
      setTimeout(() => {
        responsePostRequest.textContent = "";
      }, 1000);
    });
}


function createProject(title, img, id, categoryId) {  

  //Création des cards dans gallery
  const addProjectGallery = document.createElement('figure');
  addProjectGallery.setAttribute("index", id);
  addProjectGallery.setAttribute("category-id", categoryId);
  addProjectGallery.classList.add("figure-portfolio")

  const addProjectGalleryImg = document.createElement('img');
  addProjectGalleryImg.setAttribute("crossorigin", "anonymous");
  addProjectGalleryImg.src = img;

  const addProjectGalleryFigcaption = document.createElement('figcaption');
  addProjectGalleryFigcaption.textContent = title;

  addProjectGallery.appendChild(addProjectGalleryImg);
  addProjectGallery.appendChild(addProjectGalleryFigcaption);

  gallery.appendChild(addProjectGallery);



  //création des cards dans  la modale
  const addPostedModalCard = document.createElement("figure");
  addPostedModalCard.setAttribute('index', id);

  const addPostedModalImg = document.createElement("img");
  addPostedModalImg.setAttribute("crossorigin", "anonymous");
  addPostedModalImg.src = img;

  const addPostedModalFigcaption = document.createElement('figcaption');
  addPostedModalFigcaption.textContent = "éditer";

  const addPostedModalBtn = document.createElement("button");
  addPostedModalBtn.classList.add("btn-delete");
  addPostedModalBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

  addPostedModalCard.appendChild(addPostedModalImg);
  addPostedModalCard.appendChild(addPostedModalFigcaption);
  addPostedModalCard.appendChild(addPostedModalBtn);

  divGalleryModal.appendChild(addPostedModalCard);
}

