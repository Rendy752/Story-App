import { html } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Modal } from 'bootstrap';

class LoginModal extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
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
                    type="text"
                    inputId="validationCustomEmail"
                    invalidFeedbackMessage="Email field is required"
                    required
                  ></input-with-validation>
                  <input-with-validation
                    placeholder="Password"
                    type="text"
                    inputId="validationCustomPassword"
                    invalidFeedbackMessage="Password field is required"
                    required
                  ></input-with-validation>

                  <button
                    type="button"
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
