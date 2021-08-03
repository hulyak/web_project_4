import togglePopup from "../utils/utils.js";

// Preview Card Popup
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__preview-title");
const popupPreview = document.querySelector(".popup_type_preview");

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleImagePreview() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupTitle.textContent = this._name;
    togglePopup(popupPreview);
  }

  _handleLikeButtonToggle(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  // have to use functions from index.js
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".element__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__text").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-button");
    const deleteButton = this._element.querySelector(".element__delete-button");
    const popupImagePreview = this._element.querySelector(".element__image");

    likeButton.addEventListener("click", (evt) =>
      this._handleLikeButtonToggle(evt)
    );
    deleteButton.addEventListener("click", () => this._handleDeleteCard());
    popupImagePreview.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }
}

export default Card;
