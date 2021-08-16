import Popup from "./Popup";

class PopupWithImage extends Popup {
  open({ link, name }) {
    super.open();

    const image = this._popupSelector.querySelector(".popup__image");
    const text = this._popupSelector.querySelector(".popup__preview-title");
    image.src = link;
    image.alt = name;
    text.textContent = name;
  }
}

export default PopupWithImage;
