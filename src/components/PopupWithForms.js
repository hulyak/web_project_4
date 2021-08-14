import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(formSubmission, popupSelector) {
    super(popupSelector);
  }
  _getInputValues() {}
  _setEventListeners() {
    this._setEventListeners();
  }
}
function toggleEditProfilePopup() {
  if (!popupEditProfile.classList.contains("popup_opened")) {
    profileFormNameInput.value = profileName.textContent;
    profileFormOccupationInput.value = profileOccupation.textContent;
  }
  togglePopup(popupEditProfile);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileOccupation.textContent = profileFormOccupationInput.value;
  togglePopup(popupEditProfile);
}
export default PopupWithForm;
