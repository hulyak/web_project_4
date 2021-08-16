class Card {
  constructor(data, { handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick; // callback
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleLikeButtonToggle(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

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
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }
}

export default Card;
