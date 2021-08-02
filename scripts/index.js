import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

// Add New Card Form
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

const closeCardButton = document.querySelector(".popup__close-button_add-card");
const addCardButton = document.querySelector(".profile__add-button");

// display cards
function displayCard(item) {
  const card = new Card(item, "#cards-template");
  document.querySelector(".elements__list").prepend(card.generateCard());
}

initialCards.forEach((item) => displayCard(item));

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

function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  // add event handlers when popup opens and remove it when popup closes
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", handleEscKey);
    modal.addEventListener("click", () => handleOutsideClick(modal));
  } else {
    document.removeEventListener("keydown", handleEscKey);
    modal.removeEventListener("click", () => handleOutsideClick(modal));
  }
}

// close the Popup by Clicking on the Overlay
function handleOutsideClick(modal) {
  modal.addEventListener("click", (e) => {
    if (!e.target.classList.contains("popup_opened")) return;
    togglePopup(e.target);
  });
}

// close the Popup by Pressing Escape key
function handleEscKey(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    togglePopup(popup);
  }
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

const editFormElement = document.querySelector(".popup_type_edit-profile");
const cardFormElement = document.querySelector(".popup__form_type_add-card ");

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
