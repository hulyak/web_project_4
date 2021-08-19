export const initialCards = [
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

export const defaultFormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

export const cardTemplate = "#cards-template";
export const elementsList = ".elements__list";

export const popupEditProfile = ".popup_type_edit-profile";
export const popupAddCard = ".popup_type_add-card";
export const popupPreview = ".popup_type_preview";

// Add New Card Form

export const cardForm = document.querySelector(".popup__form_type_add-card");

export const cardFormTitleInput = cardForm.querySelector(
  ".popup__input_type_title"
);
export const cardFormImageInput = cardForm.querySelector(
  ".popup__input_type_image-link"
);

// Preview Card Popup
export const popupImage = document.querySelector(".popup__image");
export const popupTitle = document.querySelector(".popup__preview-title");

// Edit Profile Form
export const profileForm = ".popup__form_type_edit-profile";

export const profileFormNameInput = document.querySelector(
  ".popup__input_type_name"
);
export const profileFormOccupationInput = document.querySelector(
  ".popup__input_type_job"
);
// profile properties
export const profileName = ".profile__name";
export const profileOccupation = ".profile__occupation";

// Buttons
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");
export const editFormElement = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const cardFormElement = document.querySelector(
  ".popup__form_type_add-card"
);
