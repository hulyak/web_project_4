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
export const popupConfirm = ".popup_type_confirm";

// Buttons
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addCardButton = document.querySelector(".profile__add-button");
export const deleteButton = document.querySelector(".element__delete-button");

export const editFormElement = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const cardFormElement = document.querySelector(
  ".popup__form_type_add-card"
);

export const profileName = ".profile__name";
export const profileAbout = ".profile__job";
export const profileAvatar = ".profile__avatar";
export const profileFormNameInput = document.querySelector(
  ".popup__input_type_name"
);
export const profileFormJobInput = document.querySelector(
  ".popup__input_type_job"
);
