class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
  }

  // close the Popup by Pressing Escape key
  _handleEscClose(e) {
    if (e.key === "Escape") this.close();
  }

  open() {
    this._popupElement.classList.add("popup_opened");

    if (this._popupElement.classList.contains("popup_opened")) {
      document.addEventListener("keydown", (e) => this._handleEscClose(e));
    }
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__close-button") ||
        evt.target.classList.contains("popup") // outside click
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
