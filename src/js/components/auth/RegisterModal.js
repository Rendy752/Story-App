import { html } from 'lit';
import { LitWithoutShadowDom } from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { Modal } from 'bootstrap';
import Auth from '../../network/auth';

class RegisterModal extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
    const registerForm = this.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );

    this.querySelector('.btn-login').addEventListener('click', () => {
      this._showLoginModalAndHideRegisterModal();
    });
  }

  _showLoginModalAndHideRegisterModal() {
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
  }

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log(formData);

      try {
        const response = await Auth.register({
          email: formData.email,
          password: formData.password,
        });
        await Auth.updateProfile(response.user, {
          displayName: formData.name,
        });
        window.alert('Registered a new user');

        this._showLoginModalAndHideRegisterModal();
      } catch (error) {
        window.alert('Register failed, please try again');
        console.error(error);
      }
    }
  }

  _getFormData() {
    const name = this.querySelector('#validationCustomName');
    const email = this.querySelector('#validationCustomEmail');
    const password = this.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  }

  _validateFormData(formData) {
    const isNameValid = formData.name.length > 0;
    const isEmailValid = /^[^\s@]+@[^\s@]+(\.[^\s@]+)?$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 8;

    // console.log(isNameValid, isEmailValid, isPasswordValid);
    return isNameValid && isEmailValid && isPasswordValid;
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
