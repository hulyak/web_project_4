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

const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupPreview = document.querySelector(".popup_type_preview");
const popupCloseButton = document.querySelectorAll(".popup__close-button");

// Add New Card Form
const cardForm = document.querySelector(".popup__form_type_add-card");
const cardFormTitleInput = cardForm.querySelector(".popup__input_type_title");
const cardFormImageInput = cardForm.querySelector(
  ".popup__input_type_image-link"
);

// Preview Card Popup
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__preview-title");

// Parent of Card Template
const elementsList = document.querySelector(".elements__list");
const elements = document.querySelector("#cards-template").content;

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

function createCard(data) {
  const element = elements.querySelector(".element").cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  elementImage.style.backgroundImage = `url(${data.link})`;
  element.querySelector(".element__text").textContent = data.name;

  elementImage.addEventListener("click", () => onImagePreview(data));
  element
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("element__like-button_active")
    );

  element
    .querySelector(".element__delete-button")
    .addEventListener("click", () => element.remove());

  return element;
}

// initialCards.forEach((item) => {
//   const card = new Card(item, ".element");
//   const cardElement = card.generateCard();
//   elementsList.prepend(cardElement);
// });

// display cards
function displayCard(card) {
  elementsList.prepend(createCard(card));
}

initialCards.forEach((card) => displayCard(card));

function onImagePreview(card) {
  popupImage.src = card.link;
  popupTitle.alt = card.name;
  popupTitle.textContent = card.name;
  togglePopup(popupPreview);
}

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
closePreviewButton.addEventListener("click", () => togglePopup(popupPreview));
closeProfileButton.addEventListener("click", () =>
  togglePopup(popupEditProfile)
);
