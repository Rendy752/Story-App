import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavbarContent extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
    activeLink: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.brandName = 'Story App';
  }

  render() {
    return html`
      <nav
        class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 fixed-top"
        id="navbar"
      >
        <div class="container">
          <a class="navbar-brand" href="/"><h2>Story App</h2></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarExample-expand-lg"
            aria-controls="offcanvasNavbarExample-expand-lg"
          >
            <span
              class="navbar-toggler-icon"
              data-bs-target="#offcanvasNavbarExample-expand-lg"
            ></span>
          </button>
          <div
            class="offcanvas offcanvas-start bg-dark"
            data-bs-hideresize="true"
            tabindex="-1"
            id="offcanvasNavbarExample-expand-lg"
            aria-labelledby="offcanvasNavbarExample-expand-lg"
          >
            <div class="offcanvas-header">
              <h2
                class="offcanvas-title"
                id="offcanvasLabel"
                style="color:white;"
              >
                Story App
              </h2>
              <button
                type="button"
                class="btn-close btn-close-white text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body bg-dark">
              <ul
                class="navbar-nav justify-content-end flex-grow-1 pe-3 d-flex gap-3"
              >
                <nav-link
                  name="Dashboard"
                  link="/"
                  activeLink="${this.activeLink}"
                ></nav-link>
                <nav-link
                  name="Add Story"
                  link="/story/add.html"
                  activeLink="${this.activeLink}"
                ></nav-link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('navbar-content', NavbarContent);
