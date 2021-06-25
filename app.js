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

const profileEditButton = document.querySelector(".profile__edit-button");
const closeProfileButton = document.querySelector(
  ".popup__close-button_type_edit-profile"
);
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector(
  ".popup__close-button_type_add-card"
);

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
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

const elementsList = document.querySelector(".elements__list");

function createCard(data) {
  const elements = document.querySelector("#elements").content;
  const element = elements.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = data.link;
  element.querySelector(".element__text").textContent = data.name;

  element
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });

  element
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      element.remove();
    });

  return element;
}

initialCards.forEach((card) => {
  elementsList.prepend(createCard(card));
});

profileEditButton.addEventListener("click", function () {
  profileFormNameInput.value = profileName.textContent;
  profileFormOccupationInput.value = profileOccupation.textContent;
  popupEditProfile.classList.add("popup_opened");
});

addCardButton.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});

// close popups
closeProfileButton.addEventListener("click", () =>
  popupEditProfile.classList.remove("popup_opened")
);

closeCardButton.addEventListener("click", () =>
  popupAddCard.classList.remove("popup_opened")
);

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  popupEditProfile.classList.remove("popup_opened");
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(event) {
  event.preventDefault();
  cardFormImageInput.value = element__image.src;
  cardFormTitleInput.value = element__text.textContent;
  popupAddCard.classList.remove("popup_opened");
}

cardForm.addEventListener("submit", handleCardFormSubmit);
