const openFormButton = document.querySelector(".button_type_edit");
const closeButton = document.querySelector(".popup__close-button");

const popupContainer = document.querySelector(".popup__container");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");

// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

openFormButton.addEventListener("click", function () {
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
  popupContainer.style.display = "block";
  popup.style.display = "block";
  overlay.style.opacity = "0.5";
  // popupContainer.classList.add("popup_opened");
});

function closePopup() {
  popupContainer.style.display = "none";
  popup.style.display = "none";
}

closeButton.addEventListener("click", closePopup);

// profileFormNameInput.addEventListener("input", function (event) {
//   const inputValue = event.target.value;
//   profileFormNameInput.textContent = inputValue;
// });

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  closePopup();
}

// Connect the handler to the form: it will watch the submit event
profileForm.addEventListener("submit", handleFormSubmit);
