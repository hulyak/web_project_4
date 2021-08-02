// Preview Card Popup
const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__preview-title");
const popupPreview = document.querySelector(".popup_type_preview");
const closePreviewButton = document.querySelector(
  ".popup__close-button_preview"
);

closePreviewButton.addEventListener("click", () => togglePopup(popupPreview));

function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", handleEscKey);
    modal.addEventListener("click", () => handleOutsideClick(modal));
  } else {
    document.removeEventListener("keydown", handleEscKey);
    modal.removeEventListener("click", () => handleOutsideClick(modal));
  }
}

function handleOutsideClick(modal) {
  modal.addEventListener("click", (e) => {
    if (!e.target.classList.contains("popup_opened")) return;
    togglePopup(e.target);
  });
}

// close the Popup by Pressing Escape key
function handleEscKey(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    togglePopup(popup);
  }
}

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
    popupTitle.alt = this._name;
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

    likeButton.addEventListener("click", () => this._handleLikeButtonToggle());
    deleteButton.addEventListener("click", () => this._handleDeleteCard());
    popupImagePreview.addEventListener("click", () =>
      this._handleImagePreview()
    );
  }
}

export default Card;
