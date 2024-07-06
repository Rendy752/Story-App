import { html, nothing } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';

class InputPhotoWithPreview extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },
    defaultPhoto: { type: String, reflect: true },
    defaultPhotoAlt: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.type = 'text';
    this.defaultPhoto = '';
    this.defaultPhotoAlt = '';
  }

  render() {
    return html`
      <div style="width: 100%; height: 20rem" class="mb-3">
        ${this._photoPreviewTemplate()}
      </div>
      <input
        type="file"
        class="form-control shadow-sm"
        id=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />

      ${this._feedbackTemplate()}
    `;
  }

  _triggerFileInput() {
    this.querySelector('input[type="file"]').click();
  }

  _updatePhotoPreview() {
    const imagePhotoChange = document.querySelector(
      '#validationCustomPhotoChange img',
    );
    const photoImgInput = document.querySelector('#validationCustomPhoto');

    const photo = photoImgInput.files[0];
    if (!photo) {
      imagePhotoChange.src =
        'https://th.bing.com/th/id/OIP.Ml5uIuIhGm6ahVqV8fi5RgHaHa?rs=1&pid=ImgDetMain';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      imagePhotoChange.src = event.target.result;
    };

    reader.readAsDataURL(photo);
  }

  _feedbackTemplate() {
    let validFeedbackTemplate = '';
    let invalidFeedbackTemplate = '';
    if (this.validFeedbackMessage) {
      validFeedbackTemplate = html`
        <div class="valid-feedback">${this.validFeedbackMessage}</div>
      `;
    }
    if (this.invalidFeedbackMessage) {
      invalidFeedbackTemplate = html`
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
      `;
    }

    return html`${validFeedbackTemplate}${invalidFeedbackTemplate}`;
  }

  _photoPreviewTemplate() {
    return html`
      <div
        class="w-100 h-100 text-center ${this.defaultPhoto ? 'd-none' : ''}"
        style="
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        "
        id="${this.inputId || nothing}Change"
      >
        <img class="img-fluid h-100 rounded shadow-sm bg-light"
        src="${this.defaultPhoto
          ? this.defaultPhoto
          : 'https://th.bing.com/th/id/OIP.Ml5uIuIhGm6ahVqV8fi5RgHaHa?rs=1&pid=ImgDetMain'}"
        alt="${this.defaultPhotoAlt}" id="${this.inputId || nothing}Img"
        @click="${this._triggerFileInput}"
      </div>
    `;
  }
}

customElements.define('input-photo-with-preview', InputPhotoWithPreview);
