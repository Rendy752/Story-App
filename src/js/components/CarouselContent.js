import { LitElement, html, css } from 'lit';
import carouselStyles from '../../css/vendors-extensions/carousel.css';

class CarouselContent extends LitElement {
  static properties = {
    _storiesPicture: { type: Array },
  };

  constructor() {
    super();
    this._storiesPicture = [];
    this.init();
  }

  async init() {
    await this._initialData();
    this._populateCarousel();
  }

  async _initialData() {
    const fetchData = require('../../public/data/DATA');
    const data = await fetchData();
    if (!data) {
      throw new Error('Data is not found');
    }
    this._storiesPicture = data.map((item) => item.photoUrl);
  }

  _populateCarousel() {
    let carouselIndicators = '';
    let carouselItems = '';
    let carouselPrevLabels = '';
    let carouselNextLabels = '';
    let carouselNavLabels = '';

    this._storiesPicture.forEach((pictureUrl, index) => {
      const id = `carousel-${index + 1}`;
      const checked = index === 0 ? 'checked' : '';

      carouselIndicators += `<input type="radio" id="${id}" name="carousel[]" ${checked} />`;

      carouselItems += `
        <li class="carousel__item">
          <img src="${pictureUrl}" alt="" />
        </li>
      `;

      carouselPrevLabels += `<label for="${id}"></label>`;
      carouselNextLabels += `<label for="${id}"></label>`;
      carouselNavLabels += `<label for="${id}"></label>`;
    });

    this.shadowRoot.querySelector('.carousel').innerHTML += carouselIndicators;
    this.shadowRoot.querySelector(
      '.carousel',
    ).innerHTML += `<ul class="carousel__items">${carouselItems}</ul>`;
    this.shadowRoot.querySelector(
      '.carousel',
    ).innerHTML += `<div class="carousel__prev">${carouselPrevLabels}</div>`;
    this.shadowRoot.querySelector(
      '.carousel',
    ).innerHTML += `<div class="carousel__next">${carouselNextLabels}</div>`;
    this.shadowRoot.querySelector(
      '.carousel',
    ).innerHTML += `<div class="carousel__nav">${carouselNavLabels}</div>`;
  }

  static styles = css([`${carouselStyles}`]);

  render() {
    return html` <div class="carousel"></div> `;
  }
}

customElements.define('carousel-content', CarouselContent);
