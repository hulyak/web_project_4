import Card from "./Card";

class Section {
  constructor({ data }, containerSelector) {
    this._initialArray = data;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  renderItems() {
    // Iterate over the _renderedItems array of messages
    this._initialArray.forEach((item) => {
      // Based on the isOwner field, create instances of the classes
      const card = new Card(item, "#cards-template");
      const cardElement = card.generateCard();
      // Insert the markup on the page
      // using the setItem() method of the Section() class
      this.setItem(cardElement);
    });
  }
}

export default Section;
