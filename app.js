const openFormButton = document.querySelector(".button_type_edit");
const closeButton = document.querySelector(".popup__close-button");

const popupContainer = document.querySelector(".popup__container");
const popup = document.querySelector(".popup");

// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const profileForm = document.forms.profile;

function toggleForm() {
  // popupContainer.classList.toggle("popup_opened");
  // popupContainer.style.display = "block";
  // popup.style.display = "block";
  popup.classList.add("popup_opened");
}

openFormButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

// closeButton.addEventListener("click", () => {
//   popupContainer.style.display = "none";
//   popup.style.display = "none";
// });

// profileFormNameInput.addEventListener("input", function (event) {
//   const inputValue = event.target.value;
//   profileFormNameInput.textContent = inputValue;
// });

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileFormNameInput = profileForm.elements.name;
  const profileFormOccupationInput = profileForm.elements.occupation;

  // Get the values of each field from the corresponding value property
  // Select elements where the field values will be entered
  // Insert new values using the textContent property of the querySelector() method
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
}

// Connect the handler to the form: it will watch the submit event
profileForm.addEventListener("submit", handleFormSubmit);
