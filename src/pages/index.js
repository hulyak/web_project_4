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
function handleLoading(isLoading, popup, textInput) {
  if (isLoading) {
    document.querySelector(popup).querySelector(".popup__button").textContent =
      textInput;
  } else {
    document.querySelector(popup).querySelector(".popup__button").textContent =
      textInput;
  }
}

// Preview Image Popup
const imagePopup = new PopupWithImage(popupPreview);
imagePopup.setEventListeners();

console.log(api.getAppInfo());

// Delete card confirmation popup
const deleteCardPopup = new PopupWithForm({
  popupSelector: popupConfirm,
});

deleteCardPopup.setEventListeners();

// render the cards to the DOM
api
  .getAppInfo()
  .then(([userData, initialCardsList]) => {
    const userId = userData._id;
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
            createCard(item);
            handleLoading(false, popupAddCard, "Save");
          })
          .catch((err) => console.log(err));
      },
    });

    // show popup for adding a new card
    addCardButton.addEventListener("click", () => newCardPopup.open());
    newCardPopup.setEventListeners();

    // Create Cards
    function createCard(items) {
      const card = new Card(
        items,
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
          // Like Card
          handleLikeClick: (cardId, likeButton) => {
            if (likeButton.classList.contains(".element__like-button_active")) {
              api
                .deleteLikes(cardId)
                .then((data) => {
                  card.handleLikeCount(data.likes.length);
                  card.handleLikeButtonToggle(likeButton);
                })
                .catch((err) => console.error(err));
            } else {
              api
                .getLikes(cardId)
                .then((data) => {
                  card.handleLikeCount(data.likes.length);
                  card.handleLikeButtonToggle(likeButton);
                })
                .catch((err) => console.error(err));
            }
          },
        },
        userId,
        cardTemplate
      );
      cardsList.setItem(card.generateCard());
    }
  })
  .catch((err) => console.log(err));

// Profile Card Form with API
const userInfo = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

// Edit Profile Form with API
const userInfoPopup = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmit: ({ name, about }) => {
    handleLoading(true, popupEditProfile, "Saving...");
    api
      .setUserInfo({ name, about })
      .then(() => {
        userInfo.setUserInfo({ name, about });
      })
      .catch((err) => console.log(err));
  },
});

userInfoPopup.setEventListeners();

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

// Initial page load - update user info and avatar
api
  .loadUserInfo()
  .then(({ avatar }) => {
    userInfo.setAvatarInfo({ avatar });
  })
  .catch((err) => console.log(err));

api
  .loadUserInfo()
  .then(({ name, about }) => {
    userInfo.setUserInfo({ name, about });
  })
  .catch((err) => console.log(err));

// Event Listeners
profileEditButton.addEventListener("click", () => {
  // prepopulate profile form at first click
  const { name, about } = userInfo.getUserInfo();
  profileFormNameInput.value = name;
  profileFormJobInput.value = about;
  userInfoPopup.open();
});

profileAvatarButton.addEventListener("click", () => profileAvatarPopup.open());
