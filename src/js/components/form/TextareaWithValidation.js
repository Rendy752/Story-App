import { html, nothing } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    placeholder: { type: String, reflect: true },
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.rows = 3;
    this.required = false;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `Atribut "invalidFeedbackMessage" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <div class="form-floating mt-3">
        <textarea
          id=${this.inputId || nothing}
          class="form-control shadow-sm"
          style="height: 300px;"
          rows=${this.rows || nothing}
          value=${this.value || nothing}
          ?required=${this.required}
          placeholder=${this.placeholder || nothing}
          @input=${(e) => (this.value = e.target.value)}
        ></textarea>
        <label for="${this.inputId}" class="form-label"
          >${this.placeholder}</label
        >

        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
      </div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html`
        <div class="valid-feedback">${this.validFeedbackMessage}</div>
      `;
    }

    return html``;
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
