import "./index.css";
import Card from "../components/Card";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
  initialCards,
  editFormElement,
  cardFormElement,
} from "../utils/constants.js";

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

const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__occupation",
});

const userInfoPopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handleSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
    });
  },
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    userInfoPopup.open();
  });

userInfoPopup.setEventListeners();

// Add New Card
const newCardPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-card",

  handleSubmit: (item) => {
    const card = new Card(
      item,
      {
        handleCardClick: (data) => {
          const newCard = [{ name: data.textContent, link: data.src }];
          cardsList.renderItems(newCard);
          imagePopup.open(data);
        },
      },
      "#cards-template"
    );
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
  },
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardPopup.open();
});

newCardPopup.setEventListeners();

// Form Validator

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
