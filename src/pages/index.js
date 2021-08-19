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
} from "../utils/constants.js";

// Create Cards

// Generate Cards
const cardsList = new Section(
  {
    initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        {
          handleCardClick: (data) => {
            imagePopup.open(data);
          },
        },
        cardTemplate
      );
      const cardElement = card.generateCard();
      cardsList.setItem(cardElement);
    },
  },
  elementsList
);

cardsList.renderItems();

// Profile Card Form
// const userInfo = new UserInfo({
//   name: ".profile__name",
//   job: ".profile__occupation",
// });

// const userInfoPopup = new PopupWithForm({
//   popupEditProfile,
//   handleSubmit: (data) => {
//     userInfo.setUserInfo({
//       name: data.name,
//       job: data.job,
//     });
//   },
// });

// userInfoPopup.setEventListeners();

// // Preview Image Popup
// const imagePopup = new PopupWithImage(popupPreview);
// imagePopup.setEventListeners();

// // Add New Card
// const newCardPopup = new PopupWithForm({
//   popupAddCard,
//   handleSubmit: ({ name, link }) => {
//     const newCard = { name, link };
//     const card = new Card(
//       newCard,
//       {
//         handleCardClick: ({ link, name }) => {
//           imagePopup.open({ link, name });
//         },
//       },
//       cardsTemplate
//     );
//     const cardElement = card.generateCard();
//     cardsList.setItem(cardElement);
//   },
// });

// newCardPopup.setEventListeners();

// Form Validator
const editFormValidator = new FormValidator(defaultFormConfig, editFormElement);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormElement);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Event Listeners
profileEditButton.addEventListener("click", () => {
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
