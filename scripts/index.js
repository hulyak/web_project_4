// profile properties
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// profile form properties
const profileForm = document.forms.profile;
const profileFormNameInput = profileForm.elements.name;
const profileFormOccupationInput = profileForm.elements.occupation;

// add card properties
const cardForm = document.forms.card;
const cardFormTitleInput = cardForm.elements.title;
const cardFormImageInput = cardForm.elements.imageLink;

// Profile Edit Popup
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const closeProfileButton = document.querySelector(
  ".popup__close-button_profile"
);

// Add New Card Popup
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const closeCardButton = document.querySelector(".popup__close-button_add-card");

// Preview Card Popup
const popupPreview = document.querySelector(".popup_type_preview");
const closePreviewButton = document.querySelector(
  ".popup__close-button_preview"
);
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__preview-title");

// Parent of Card Template
const elementsList = document.querySelector(".elements__list");
const elements = document.querySelector("#cards-template").content;

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

// display cards
function displayCard(card) {
  elementsList.prepend(createCard(card));
}

initialCards.forEach((card) => displayCard(card));

function onImagePreview(card) {
  popupImage.src = card.link;
  popupTitle.alt = card.name;
  popupTitle.textContent = card.name;
  openPopup(popupPreview);
}

function openPopup(modal) {
  modal.classList.add("popup_opened");
}

function closePopup(modal) {
  modal.classList.remove("popup_opened");
}

function toggleEditProfilePopup() {
  if (!popupEditProfile.classList.contains("popup_opened")) {
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
  }
  openPopup(popupEditProfile);
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
  cardFormTitleInput.value = "";
  cardFormImageInput.value = "";
}

// Event Handlers
profileEditButton.addEventListener("click", () => {
  toggleEditProfilePopup();
});

closeProfileButton.addEventListener("click", () =>
  closePopup(popupEditProfile)
);

addCardButton.addEventListener("click", () => openPopup(popupAddCard));
closeCardButton.addEventListener("click", () => closePopup(popupAddCard));
closePreviewButton.addEventListener("click", () => closePopup(popupPreview));

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

// close the Popup by Clicking on the Overlay
function handleClosePopup(e) {
  if (
    (e) =>
      e.target === popupEditProfile ||
      e.target === popupAddCard ||
      e.target === popupPreview
  ) {
    closePopup(e.target);
  }
}

window.addEventListener("click", handleClosePopup);

// close the Popup by Pressing Escape key
function handleEscKey(e) {
  if (e.key === "Escape") {
    closePopup(e.target);
  }
}

window.addEventListener("keydown", handleEscKey);
