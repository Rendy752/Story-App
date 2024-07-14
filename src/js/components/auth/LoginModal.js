import { html } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Modal } from 'bootstrap';
import Config from '../../config/config';
import Utils from '../../utils/utils';
import Auth from '../../network/auth';
import CheckUserAuth from '../../pages/auth/check-user-auth';

class LoginModal extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
    const loginForm = this.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );

    this.querySelector('.btn-register').addEventListener('click', () => {
      const registerModalElement = document.querySelector('#registerModal');
      const loginModalElement = this.querySelector('#loginModal');

      if (registerModalElement && loginModalElement) {
        const registerModal = new Modal(registerModalElement);

        loginModalElement.classList.remove('show');
        loginModalElement.style.display = 'none';
        document.querySelector('.modal-backdrop').remove();
        registerModal.show();
      } else {
        console.error('Register modal element not found');
      }
    });
  }

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log(formData);

      try {
        const loginSubmit = this.querySelector('#loginSubmit');
        loginSubmit.disabled = true;
        loginSubmit.innerHTML = `
        <div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
`;
        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });
        // Utils.setUserToken(Config.USER_TOKEN_KEY, response.user.accessToken);
        Utils.setUserToken(
          Config.USER_TOKEN_KEY,
          response.data.loginResult.token,
        );
        Utils.setUserName(Config.USER_NAME_KEY, response.data.loginResult.name);
        CheckUserAuth.checkLoginState();
        window.alert('Login success');
        const loginModalElement = this.querySelector('#loginModal');

        if (loginModalElement) {
          loginModalElement.classList.remove('show');
          loginModalElement.style.display = 'none';
          document.querySelector('.modal-backdrop').remove();
        }
      } catch (error) {
        window.alert('Login failed, please try again');
        console.error(error);
      } finally {
        loginSubmit.disabled = false;
        loginSubmit.innerHTML = msg('Login');
      }
    }
  }

  _getFormData() {
    const email = this.querySelector('#validationCustomEmail');
    const password = this.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  }

  _validateFormData(formData) {
    const isEmailValid = /^[^\s@]+@[^\s@]+(\.[^\s@]+)?$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 8;

    // console.log(isEmailValid, isPasswordValid);
    return isEmailValid && isPasswordValid;
  }

  render() {
    return html`
      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-title text-center">
                <h4>${msg('Login')}</h4>
              </div>
              <div class="d-flex flex-column text-center">
                <form class="row g-3 mt-3" id="loginForm" novalidate>
                  <input-with-validation
                    placeholder="Email"
                    type="email"
                    inputId="validationCustomEmail"
                    invalidFeedbackMessage="Email field must be a valid email"
                    required
                  ></input-with-validation>
                  <input-with-validation
                    placeholder="Password"
                    type="password"
                    inputId="validationCustomPassword"
                    invalidFeedbackMessage="Password field must be at least 8 characters"
                    required
                  ></input-with-validation>

                  <button
                    type="submit"
                    id="loginSubmit"
                    class="btn btn-info btn-block btn-round"
                  >
                    ${msg('Login')}
                  </button>
                </form>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div class="signup-section">
                ${msg("Don't have an account?")}
                <button class="text-info btn-register bg-transparent border-0">
                  ${msg(' Sign Up')}</button
                >.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('login-modal', LoginModal);
