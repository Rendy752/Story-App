import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    link: { type: String, reflect: true },
    activeLink: { type: String, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    updateWhenLocaleChanges(this);
  }

  getLocalizedNavLinkName() {
    switch (this.name) {
      case 'Dashboard':
        return msg('Dashboard');
      case 'Add Story':
        return msg('Add Story');
      case 'Profile':
        return msg('Profile');
      default:
        return nothing;
    }
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
          >${this.getLocalizedNavLinkName()}
        </a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
