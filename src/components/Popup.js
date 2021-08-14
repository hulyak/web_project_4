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
      document.addEventListener("keydown", () => this._handleEscClose);
    }
  }

  close() {
    document.removeEventListener("keydown", () => this._handleEscKey);
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup") // outside click
      )
        this_.close();
    });
  }
}

export default Popup;
