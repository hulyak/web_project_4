let openFormButton = document.querySelector(".button_type_edit");
let closeButton = document.querySelector(".popup__close-button");
let form = document.querySelector(".popup__form");
let inputName = document.querySelector(".popup__input_type_name");
let inputJob = document.querySelector(".popup__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let popup = document.querySelector(".popup");

function toggleForm() {
  popup.classList.toggle("popup__form_visible");
}

openFormButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_job");
  // Get the values of each field from the corresponding value property
  // Select elements where the field values will be entered
  // Insert new values using the textContent property of the querySelector() method
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Connect the handler to the form: it will watch the submit event
form.addEventListener("submit", handleFormSubmit);
