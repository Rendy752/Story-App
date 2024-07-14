import { LitElement, html, css } from 'lit';
import carouselStyles from '../../css/vendors-extensions/carousel.css';
import Stories from '../network/stories';
import Utils from '../utils/utils';
import Config from '../config/config';
import Swal from 'sweetalert2';

class CarouselContent extends LitElement {
  static properties = {
    _storiesPicture: { type: Array },
    isUserSignedIn: { type: Boolean },
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
    try {
      let listStory = [];
      const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
      this.isUserSignedIn = Boolean(userToken);
      if (!this.isUserSignedIn) {
        const fetchData = require('../../public/data/DATA');
        listStory = await fetchData();
      } else {
        const response = await Stories.getAll();
        listStory = response.data.listStory;
      }
      this._storiesPicture = listStory.map((item) => item.photoUrl);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
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
