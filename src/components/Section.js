class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    console.log(items);
    items.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
