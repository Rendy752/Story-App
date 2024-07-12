import { html, nothing } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class InputWithValidation extends LitWithoutShadowDom {
  static properties = {
    placeholder: { type: String, reflect: true },
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    updateWhenLocaleChanges(this);

    this.type = 'text';
    this.required = false;
  }

  getLocalizedPlaceholder() {
    switch (this.placeholder) {
      case 'Name':
        return msg('Name');
      case 'Email':
        return msg('Email');
      case 'Password':
        return msg('Password');
      default:
        return nothing;
    }
  }

  getLocalizedInvalidFeedbackMessage() {
    switch (this.invalidFeedbackMessage) {
      case 'Name field is required':
        return msg('Name field is required');
      default:
        return nothing;
    }
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
      <div class="form-floating">
        <input
          id=${this.inputId || nothing}
          class="form-control shadow-sm"
          type=${this.type}
          value=${this.value || nothing}
          ?required=${this.required}
          placeholder=${this.getLocalizedPlaceholder() || nothing}
          @input=${(e) => (this.value = e.target.value)}
        />
        <label for="${this.inputId}" class="form-label"
          >${this.getLocalizedPlaceholder()}</label
        >

        ${this._validFeedbackTemplate()}
        <div class="invalid-feedback">
          ${this.getLocalizedInvalidFeedbackMessage()}
        </div>
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

customElements.define('input-with-validation', InputWithValidation);
