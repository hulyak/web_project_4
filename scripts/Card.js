// Popups
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupPreview = document.querySelector(".popup_type_preview");
const popupCloseButton = document.querySelectorAll(".popup__close-button");

// Add New Card Form
const cardForm = document.querySelector(".popup__form_type_add-card");
const cardFormTitleInput = cardForm.querySelector(".popup__input_type_title");
const cardFormImageInput = cardForm.querySelector(
  ".popup__input_type_image-link"
);

// Preview Card Popup
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__preview-title");

// Parent of Card Template
const elementsList = document.querySelector(".elements__list");
const elements = document.querySelector("#cards-template").content;

class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleImagePreview() {
    popupImage.src = this._image;
    popupTitle.alt = this._text;
    popupTitle.textContent = this._text;
    this._togglePopup(popupPreview);
  }

  _togglePopup(modal) {
    modal.classList.toggle("popup_opened");
    // add event handlers when popup opens and remove it when popup closes
    if (modal.classList.contains("popup_opened")) {
      document.addEventListener("keydown", handleEscKey);
      modal.addEventListener("click", () => handleOutsideClick(modal));
    } else {
      document.removeEventListener("keydown", handleEscKey);
      modal.removeEventListener("click", () => handleOutsideClick(modal));
    }
  }

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add("popup_is-opened");
  }

  _handleClosePopup() {
    popupImage.src = "";
    popupElement.classList.remove("popup_is-opened");
  }

  _handleLikeButtonToggle(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _handleDeleteCard() {
    element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => element.remove());
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeButtonToggle(evt);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".element__image"
    ).style.backgroundImage = `url(${this._image})`;
    this._element.querySelector(".element__text").textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}
