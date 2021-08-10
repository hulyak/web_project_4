export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupPreview = document.querySelector(".popup_type_preview");

// Add New Card Form
export const cardListSection = document.querySelector(".elements__list");
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
export const profileForm = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const profileFormNameInput = profileForm.querySelector(
  ".popup__input_type_name"
);
export const profileFormOccupationInput = profileForm.querySelector(
  ".popup__input_type_job"
);
// profile properties
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__occupation");

// Buttons
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);

export const closeProfileButton = document.querySelector(
  ".popup__close-button_profile"
);
export const closePreviewButton = document.querySelector(
  ".popup__close-button_preview"
);

export const closeCardButton = document.querySelector(
  ".popup__close-button_add-card"
);
export const addCardButton = document.querySelector(".profile__add-button");

export const editFormElement = document.querySelector(
  ".popup__form_type_edit-profile"
);
export const cardFormElement = document.querySelector(
  ".popup__form_type_add-card"
);

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
