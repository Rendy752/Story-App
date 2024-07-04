import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavbarContent extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.brandName = 'Story App';
  }

  render() {
    return html`
      <nav class="navbar bg-primary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">StoryApp</a>
          <button
            class="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                StoryApp
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <nav-link name="${msg(`Dashboard`)}" link="/"></nav-link>
                <nav-link
                  name="${msg(`Add Story`)}"
                  link="/story/add.html"
                ></nav-link>
              </ul>
              <form class="d-flex mt-3" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('navbar-content', NavbarContent);
