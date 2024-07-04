import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';

class StoryItem extends LitWithoutShadowDom {
  static properties = {
    id: { type: String, reflect: true },
    name: { type: String, reflect: true },
    description: { type: String, reflect: true },
    photoUrl: { type: String, reflect: true },
    createdAt: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('id')) {
      throw new Error(
        `Attribute "id" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('name')) {
      throw new Error(
        `Attribute "name" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('description')) {
      throw new Error(
        `Attribute "description" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('photoUrl')) {
      throw new Error(
        `Attribute "photoUrl" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('createdAt')) {
      throw new Error(
        `Attribute "createdAt" must be applied to the ${this.localName} element`,
      );
    }
  }

  render() {
    return html`
      <div class="container" id="${this.id}">
        <div class="front" style="background-image: url(${this.photoUrl})">
          <div class="inner">
            <p>${this.name}</p>
            <span
              >${new Date(this.createdAt).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span
            >
          </div>
        </div>
        <div class="back">
          <div class="inner">
            <p>${this.description}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-item', StoryItem);
