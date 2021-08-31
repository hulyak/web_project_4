import "./index.css";
import Card from "../components/Card";
import Api from "../components/Api";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {
  editFormElement,
  cardFormElement,
  defaultFormConfig,
  profileEditButton,
  popupAddCard,
  cardTemplate,
  elementsList,
  popupEditProfile,
  popupPreview,
  popupConfirm,
  addCardButton,
  profileName,
  profileAbout,
  profileAvatar,
  profileFormNameInput,
  profileFormJobInput,
  deleteButton,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${process.env.GROUP_ID}`,
  headers: {
    authorization: process.env.TOKEN,
    "Content-Type": "application/json",
  },
});

// Preview Image Popup
const imagePopup = new PopupWithImage(popupPreview);
imagePopup.setEventListeners();

// Create Cards
const createCard = (item) => {
  const card = new Card(
    item,
    {
      handleCardClick: ({ name, link }) => imagePopup.open({ name, link }),
      // Delete Card Popup
      handleDeleteClick: () => {
        const id = card.getId();
        const deleteCardPopup = new PopupWithForm({
          popupSelector: popupConfirm,
          handleSubmit: () => {
            api
              .deleteCard(id)
              .then((card) => {
                card.handleDeleteCard();
                deleteCardPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        });
        deleteCardPopup.setEventListeners();
        deleteCardPopup.open(id);
      },
    },
    cardTemplate
  );
  cardsList.setItem(card.generateCard());
};

// Generate Cards
const cardsList = new Section(
  {
    renderer: createCard,
  },
  elementsList
);

// render the cards to the DOM
api
  .getInitialCards()
  .then((items) => cardsList.renderItems(items))
  .catch((err) => console.log(err));

// Add New Card
const newCardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  handleSubmit: ({ name, link }) =>
    api
      .addCard({ name, link })
      .then((item) => createCard(item))
      .catch((err) => console.log(err)),
});

newCardPopup.setEventListeners();

// Profile Card Form with API
const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
});

api
  .loadUserInfo()
  .then(({ name, about }) => {
    userInfo.setUserInfo({ name, about });
  })
  .catch((err) => console.log(err));

const userInfoPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmit: ({ name, about }) => {
    api
      .setUserInfo({ name, about })
      .then(() => {
        userInfo.setUserInfo({ name, about });
      })
      .catch((err) => console.log(err));
  },
});

userInfoPopup.setEventListeners();

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
