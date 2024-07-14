import { html } from 'lit';
import { LitWithoutShadowDom } from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Modal } from 'bootstrap';
// import Auth from '../network/auth';
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/auth/check-user-auth';

class NavbarContent extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
    activeLink: { type: String, reflect: true },
  };

  firstUpdated() {
    this.querySelector('.btn-login').addEventListener('click', () => {
      const loginModalElement = this.querySelector('#loginModal');
      if (loginModalElement) {
        const loginModal = new Modal(loginModalElement);

        loginModal.show();
      } else {
        console.error('Login modal element not found');
      }
    });
  }

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
                class="navbar-nav justify-content-end flex-grow-1 pe-3 d-flex gap-3 align-items-center"
              >
                <locale-picker></locale-picker>
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
                <nav-link
                  name="Profile"
                  link="/profile.html"
                  activeLink="${this.activeLink}"
                ></nav-link>
                <div id="authContainer" class="d-flex gap-3 align-items-center">
                  <button
                    id="loginBtn"
                    type="button"
                    class="btn btn-info btn-round btn-login d-none"
                  >
                    ${msg('Login')}
                  </button>
                  <div
                    id="userLoggedMenu"
                    class="d-none text-white fw-bold"
                  ></div>
                  <button
                    id="logoutBtn"
                    type="button"
                    class="btn btn-info btn-round d-none"
                    @click=${this._userLogOut}
                  >
                    ${msg('Logout')}
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <login-modal></login-modal>
      <register-modal></register-modal>
    `;
  }

  async _userLogOut(event) {
    event.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);
    Utils.destroyUserName(Config.USER_NAME_KEY);
    CheckUserAuth.checkLoginState();
    // try {
    //   await Auth.logout();
    //   window.alert('Successfully logged out');
    //   CheckUserAuth.checkLoginState();
    // } catch (error) {
    //   console.error(error);
    // }
  }
}

customElements.define('navbar-content', NavbarContent);
