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
  profileAvatarElement,
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

// Form Validators
const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormElement);
const editAvatarValidator = new FormValidator(
  defaultFormConfig,
  profileAvatarElement
);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();

// Handle Loading
const handleLoading = (isLoading, modal, textInput) => {
  if (isLoading) {
    modal.querySelector(".popup__button").textContent = textInput;
  } else {
    modal.querySelector(".popup__button").textContent = textInput;
  }
};

// Profile Card Form with API
const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

// Preview Image Popup
const imagePopup = new PopupWithImage(popupPreview);
imagePopup.setEventListeners();

console.log(api.getAppInfo());

// Delete card confirmation popup
const deleteCardPopup = new PopupWithForm({
  popupSelector: popupConfirm,
  handleSubmit: () => {},
});

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
      handleSubmit: ({ name, link }) => {
        handleLoading(true, popupAddCard, "Saving...");
        api
          .addCard({ name, link })
          .then((item) => {
            handleLoading(false, popupAddCard, "Save");
            createCard(item);
          })
          .catch((err) => console.log(err));
      },
    });

    addCardButton.addEventListener("click", () => newCardPopup.open());

    newCardPopup.setEventListeners();

    // Create Cards
    const renderCards = (item) => {
      const card = new Card(
        item,
        {
          handleCardClick: ({ name, link }) => imagePopup.open({ name, link }),
          // Delete Card Popup
          handleDeleteClick: (cardId) => {
            deleteCardPopup.open();
            deleteCardPopup.setSubmitHandler(() => {
              handleLoading(true, popupConfirm, "Deleting...");
              api
                .deleteCard(cardId)
                .then(() => {
                  card.handleDeleteCard();
                  handleLoading(true, popupConfirm, "Yes");
                })
                .catch((err) => console.log(err));
            });
          },
        },
        userId,
        cardTemplate
      );
      cardsList.setItem(card.generateCard());
    };
  })
  .catch((err) => console.log(err));

// Edit Profile Form with API
const userInfoPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmit: ({ name, about, avatar }) => {
    handleLoading(true, popupEditProfile, "Saving...");
    api
      .setUserInfo({ name, about, avatar })
      .then(() => {
        userInfo.setUserInfo({ name, about, avatar });
      })
      .catch((err) => console.log(err));
  },
});

userInfoPopup.setEventListeners();

api
  .loadUserInfo()
  .then(({ name, about }) => {
    userInfo.setUserInfo({ name, about });
  })
  .catch((err) => console.log(err));

// Update Profile Avatar
const profileAvatarPopup = new PopupWithForm({
  popupSelector: popupProfileAvatar,
  handleSubmit: ({ avatar }) => {
    handleLoading(true, popupProfileAvatar, "Saving...");
    api
      .setUserAvatar({ avatar })
      .then(({ avatar }) => {
        userInfo.setAvatarInfo({ avatar });
        handleLoading(false, popupProfileAvatar, "Save");
      })
      .catch((err) => console.log(err));
  },
});

profileAvatarPopup.setEventListeners();

// Event Listeners
profileEditButton.addEventListener("click", () => {
  // prepopulate profile form at first click
  const { name, about } = userInfo.getUserInfo();
  profileFormNameInput.value = name;
  profileFormJobInput.value = about;
  userInfoPopup.open();
});

profileAvatarButton.addEventListener("click", () => profileAvatarPopup.open());
deleteButton.addEventListener("click", () => deleteCardPopup.open());
