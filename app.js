const openFormButton = document.querySelector(".profile__edit-button");
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
  overlay.style.display = "block";
});

function closePopup() {
  popupContainer.style.display = "none";
  popup.style.display = "none";
  overlay.style.display = "none";
}

closeButton.addEventListener("click", closePopup);

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  closePopup();
}

// Connect the handler to the form: it will watch the submit event
profileForm.addEventListener("submit", handleFormSubmit);
