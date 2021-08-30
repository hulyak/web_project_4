import "./index.css";
import Card from "../components/Card";
import Api from "../components/Api";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
  initialCards,
  editFormElement,
  cardFormElement,
  defaultFormConfig,
  profileEditButton,
  popupAddCard,
  cardTemplate,
  elementsList,
  popupEditProfile,
  popupPreview,
  addCardButton,
  profileName,
  profileAbout,
  profileAvatar,
  profileFormNameInput,
  profileFormJobInput,
  deleteButton,
} from "../utils/constants.js";

// Create Cards
const createCard = (item) => {
  const card = new Card(
    item,
    { handleCardClick: ({ name, link }) => imagePopup.open({ name, link }) },
    // { handleDeleteClick: ({ id }) => deleteCard(id) },
    cardTemplate
  );
  cardsList.setItem(card.generateCard());
};

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${process.env.GROUP_ID}`,
  headers: {
    authorization: process.env.TOKEN,
    "Content-Type": "application/json",
  },
});

// const initialCards = api.getInitialCards().then((res) => res);

// Generate Cards
const cardsList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  elementsList
);

// render the cards to the DOM
cardsList.renderItems();

deleteButton.addEventListener("click", () => {
  confirmPopup.open();
});

// Preview Image Popup
const imagePopup = new PopupWithImage(popupPreview);
imagePopup.setEventListeners();

// Add New Card
const newCardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  handleSubmit: createCard,
});

newCardPopup.setEventListeners();

// Profile Card Form with API
api.loadUserInfo().then((data) => {
  console.log(data);
  userInfoPopup.setEventListeners();
});

const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmit: (data) => {
    userInfo
      .setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      })
      .then(() => {
        userInfo.setUserInfo(data);
      });
  },
});

// Form Validator
const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Event Listeners
profileEditButton.addEventListener("click", () => {
  // prepopulate profile form at first click
  const { name, about } = userInfo.getUserInfo();
  profileFormNameInput.value = name;
  profileFormJobInput.value = about;
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
