import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    link: { type: String, reflect: true },
    activeLink: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('name')) {
      throw new Error(
        `Attribute "name" must be applied to the ${this.localName} element`,
      );
    }

    if (!this.hasAttribute('link')) {
      throw new Error(
        `Atribut "link" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    return html`
      <li class="nav-item fs-5">
        <a
          class="nav-link ${this.activeLink === this.link && 'active'}"
          aria-current="page"
          href="${this.link}"
          >${this.name}</a
        >
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
