import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initial-cards.js";
import togglePopup from "../utils/utils.js";

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

// Add New Card Form
const cardList = document.querySelector(".elements__list");
const cardForm = document.querySelector(".popup__form_type_add-card");
const cardFormTitleInput = cardForm.querySelector(".popup__input_type_title");
const cardFormImageInput = cardForm.querySelector(
  ".popup__input_type_image-link"
);

// Edit Profile Form
const profileForm = document.querySelector(".popup__form_type_edit-profile");
const profileFormNameInput = profileForm.querySelector(
  ".popup__input_type_name"
);
const profileFormOccupationInput = profileForm.querySelector(
  ".popup__input_type_job"
);
// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// Buttons
const profileEditButton = document.querySelector(".profile__edit-button");

const closeProfileButton = document.querySelector(
  ".popup__close-button_profile"
);
const closePreviewButton = document.querySelector(
  ".popup__close-button_preview"
);

const closeCardButton = document.querySelector(".popup__close-button_add-card");
const addCardButton = document.querySelector(".profile__add-button");

function createCard(item) {
  const card = new Card(item, "#cards-template");
  const cardElement = card.generateCard();
  return cardElement;
}

function displayCard(card) {
  cardList.prepend(createCard(card));
}

initialCards.forEach((card) => displayCard(card));

function toggleEditProfilePopup() {
  if (!popupEditProfile.classList.contains("popup_opened")) {
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
  }
  togglePopup(popupEditProfile);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  togglePopup(popupEditProfile);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const data = {
    name: cardFormTitleInput.value,
    link: cardFormImageInput.value,
  };
  displayCard(data);
  togglePopup(popupAddCard);
  cardForm.reset();
}

// Event Handlers
profileEditButton.addEventListener("click", () => {
  toggleEditProfilePopup();
});

addCardButton.addEventListener("click", () => togglePopup(popupAddCard));
cardForm.addEventListener("submit", handleNewCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

closeCardButton.addEventListener("click", () => togglePopup(popupAddCard));
closeProfileButton.addEventListener("click", () =>
  togglePopup(popupEditProfile)
);

closePreviewButton.addEventListener("click", () => togglePopup(popupPreview));

const editFormElement = document.querySelector(
  ".popup__form_type_edit-profile"
);
const cardFormElement = document.querySelector(".popup__form_type_add-card");

const defaultFormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
