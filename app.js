const openFormButton = document.querySelector(".button_type_edit");
const closeButton = document.querySelector(".popup__close-button");

const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const overlay = document.querySelector(".popup__overlay");

// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const profileForm = document.forms.profile;

function toggleForm() {
  // popup.classList.toggle("popup_opened");
  popup.style.display = "flex";
  overlay.style.display = "block";
}

openFormButton.addEventListener("click", toggleForm);

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});

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
form.addEventListener("submit", handleFormSubmit);
