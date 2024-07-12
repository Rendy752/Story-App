import { html } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Modal } from 'bootstrap';

class RegisterModal extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
    this.querySelector('.btn-login').addEventListener('click', () => {
      const loginModalElement = document.querySelector('#loginModal');
      const registerModalElement = document.querySelector('#registerModal');
      if (loginModalElement && registerModalElement) {
        const loginModal = new Modal(loginModalElement);

        registerModalElement.classList.remove('show');
        registerModalElement.style.display = 'none';
        document.querySelector('.modal-backdrop').remove();
        loginModal.show();
      } else {
        console.error('Register modal element not found');
      }
    });
  }

  render() {
    return html`
      <div
        class="modal fade"
        id="registerModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-title text-center">
                <h4>${msg('Register')}</h4>
              </div>
              <div class="d-flex flex-column text-center">
                <form class="row g-3 mt-3" id="registerForm" novalidate>
                  <input-with-validation
                    placeholder="Name"
                    type="text"
                    inputId="validationCustomName"
                    invalidFeedbackMessage="Name field is required"
                    required
                  ></input-with-validation>
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
                    ${msg('Register')}
                  </button>
                </form>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div class="signup-section">
                ${msg('Already have an account?')}
                <button class="text-info btn-login bg-transparent border-0">
                  ${msg(' Login')}</button
                >.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('register-modal', RegisterModal);
