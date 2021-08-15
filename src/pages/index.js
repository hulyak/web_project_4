import "./index.css";
import Card from "../components/Card";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
  initialCards,
  profileForm,
  profileFormNameInput,
  profileFormOccupationInput,
  profileName,
  profileOccupation,
  profileEditButton,
  closeProfileButton,
  closePreviewButton,
  closeCardButton,
  addCardButton,
  cardForm,
  editFormElement,
  cardFormElement,
  popupEditProfile,
  popupAddCard,
  cardFormTitleInput,
  cardFormImageInput,
} from "../utils/constants.js";
import togglePopup from "../utils/utils.js";

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        {
          handleCardClick: (data) => {
            imagePopup.open(data);
          },
        },
        "#cards-template"
      );
      const cardElement = card.generateCard();
      cardsList.setItem(cardElement);
    },
  },
  ".elements__list"
);

cardsList.renderItems();

const imagePopup = new PopupWithImage(".popup_type_preview");

imagePopup.setEventListeners();

const userInfoPopup = new PopupWithForm({
  popupSelector: "..popup__form_type_edit-profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

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
