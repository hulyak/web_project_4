class Card {
  constructor(data, { handleCardClick, handleDeleteClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

  getId() {
    return this._id;
  }

  handleDeleteCard() {
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

    if (this._ownerId !== this._id) {
      deleteButton.classList.add("element__trash_type_hidden ");
    }
    deleteButton.addEventListener("click", () => this._handleDeleteClick());

    popupImagePreview.addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }
}

export default Card;
