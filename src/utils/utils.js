function togglePopup(modal) {
  modal.classList.toggle("popup_opened");
  // add event handlers when popup opens and remove it when popup closes
  if (modal.classList.contains("popup_opened")) {
    document.addEventListener("keydown", handleEscKey);
    modal.addEventListener("click", () => handleOutsideClick(modal));
  } else {
    document.removeEventListener("keydown", handleEscKey);
    modal.removeEventListener("click", () => handleOutsideClick(modal));
  }
}

// close the Popup by Clicking on the Overlay
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

export default togglePopup;
