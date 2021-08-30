class Api {
  constructor({ baseUrl, headers, cardId }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardId = cardId;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default Api;
