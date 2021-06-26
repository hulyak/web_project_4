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

// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// profile form properties
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

// add card properties
const cardForm = document.forms.card;
const cardFormTitleInput = profileForm.elements.title;
const cardFormImageInput = profileForm.elements.imageLink;

// Popups
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const closeProfileButton = document.querySelector(".popup__close_profile");

const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const closeCardButton = document.querySelector(".popup__close_add-card");

const popupPreview = document.querySelector(".popup_type_preview");
const closePreviewButton = document.querySelector(".popup__close_preview");

const elementsList = document.querySelector(".elements__list");

function createCard(data) {
  const elements = document.querySelector("#cards-template").content;
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

initialCards.forEach((card) => {
  elementsList.append(createCard(card));
});

function togglePopup(modal) {
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
  modal.classList.toggle("popup_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  togglePopup(popupEditProfile);
}

function onImagePreview(card) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = card.link;
  togglePopup(popupPreview);
}

// Event Handlers
profileEditButton.addEventListener("click", (card) => {
  togglePopup(popupEditProfile);
});

closeProfileButton.addEventListener("click", () =>
  togglePopup(popupEditProfile)
);

addCardButton.addEventListener("click", () => togglePopup(popupAddCard));

closeCardButton.addEventListener("click", () => togglePopup(popupAddCard));

profileForm.addEventListener("submit", handleProfileFormSubmit);

closePreviewButton.addEventListener("click", () => togglePopup(popupPreview));
