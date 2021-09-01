class Card {
  constructor(
    data,
    { handleCardClick, handleDeleteClick, userData, handleLikeClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._creatorId = data.owner._id;
    this._userId = userData._id;
    // this._ownerName = data.owner._name;
    // this._likes = data.likes;
    // this._timesLiked = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    // this._handleLikeClick = handleLikeClick;
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

  _getId() {
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

    this.deleteBinIcon();

    return this._element;
  }

  deleteBinIcon() {
    if (this._userId !== this._creatorId) {
      this._element
        .querySelector(".element__delete-button")
        .classList.add("element__trash_type_hidden");
    }
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-button");

    const popupImagePreview = this._element.querySelector(".element__image");
    z;
    const deleteButton = this._element.querySelector(".element__delete-button");

    likeButton.addEventListener("click", (evt) =>
      this._handleLikeButtonToggle(evt)
    );

    deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._getId())
    );

    popupImagePreview.addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }
}

export default Card;
