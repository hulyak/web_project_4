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
  popupProfileAvatar,
  addCardButton,
  profileName,
  profileAbout,
  profileAvatar,
  profileAvatarButton,
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

// Profile Card Form with API
const profileInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

console.log(api.getAppInfo());

// Delete card confirmation popup
const deleteCardPopup = new PopupWithForm(popupConfirm);
deleteCardPopup.setEventListeners();

// render the cards to the DOM
api
  .getAppInfo(([userInfo, initialCardsList]) => {
    const userId = userInfo._id;

    // Generate Cards
    const cardsList = new Section(
      {
        items: initialCardsList,
        renderer: createCard,
      },
      elementsList
    );
    cardsList.renderItems();

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

    // Create Cards
    const renderCard = (item) => {
      const card = new Card(
        item,
        {
          handleCardClick: ({ name, link }) => imagePopup.open({ name, link }),
          // Delete Card Popup
          handleDeleteClick: (cardId) => {
            deleteCardPopup.open(cardId);
            deleteCardPopup.setSubmitHandler(() =>
              api
                .deleteCard(cardId)
                .then(() => card.handleDeleteCard())
                .catch((err) => console.log(err))
            );
          },
        },
        userId,
        cardTemplate
      );
      cardsList.setItem(card.generateCard());
    };
  })
  .catch((err) => console.log(err));

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
        profileInfo.setUserInfo({ name, about });
      })
      .catch((err) => console.log(err));
  },
});

userInfoPopup.setEventListeners();

// Update Profile Avatar
const profileAvatarPopup = new PopupWithForm({
  popupSelector: popupProfileAvatar,
  handleSubmit: ({ avatar }) => {
    api
      .setUserAvatar({ avatar })
      .then(() => {
        userInfo.setUserInfo({ avatar });
      })
      .catch((err) => console.log(err));
  },
});

profileAvatarPopup.setEventListeners();

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

profileAvatarButton.addEventListener("click", () => profileAvatarPopup.open());
addCardButton.addEventListener("click", () => newCardPopup.open());
deleteButton.addEventListener("click", () => deleteCardPopup.open());
