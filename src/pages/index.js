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
  defaultFormConfig,
  profileEditButton,
  popupAddCard,
  cardTemplate,
  elementsList,
  popupEditProfile,
  popupPreview,
  addCardButton,
  profileName,
  profileJob,
  profileFormNameInput,
  profileFormJobInput,
} from "../utils/constants.js";

// Create Cards
const createCard = (item) => {
  const card = new Card(
    item,
    { handleCardClick: ({ name, link }) => imagePopup.open({ name, link }) },
    cardTemplate
  );
  cardsList.setItem(card.generateCard());
};

// Generate Cards
const cardsList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  elementsList
);

cardsList.renderItems();

// Preview Image Popup
const imagePopup = new PopupWithImage(popupPreview);
imagePopup.setEventListeners();

// Add New Card
const newCardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  handleSubmit: createCard,
});

newCardPopup.setEventListeners();

// Profile Card Form
const userInfo = new UserInfo({ name: profileName, job: profileJob });

const userInfoPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.job,
    });
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
  const { name, job } = userInfo.getUserInfo();
  profileFormNameInput.value = name;
  profileFormJobInput.value = job;
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
