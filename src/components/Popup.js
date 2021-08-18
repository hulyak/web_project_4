class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // close the Popup by Pressing Escape key
  _handleEscClose(e) {
    if (e.key === "Escape") this.close();
  }

  open() {
    this._popupSelector.classList.add("popup_opened");

    if (this._popupSelector.classList.contains("popup_opened")) {
      document.addEventListener("keydown", (e) => this._handleEscClose(e));
    }
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup__button") ||
        evt.target.classList.contains("popup") // outside click
      )
        return this.close();
    });
  }
}

export default Popup;
