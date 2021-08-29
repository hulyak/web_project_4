class Api {
  constructor({ baseUrl, headers, cardId }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardId = cardId;
  }

  getInitialCards() {}
}

export default Api;
