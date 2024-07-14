import Stories from '../../network/stories';
import Utils from '../../utils/utils';
import Config from '../../config/config';
import Swal from 'sweetalert2';

const Add = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addStoryForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log(formData);

      try {
        const addSubmit = document.querySelector('#addSubmit');
        addSubmit.disabled = true;
        addSubmit.innerHTML = `
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        `;
        const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
        const isUserSignedIn = Boolean(userToken);
        if (isUserSignedIn) {
          await Stories.add(formData);
        } else {
          await Stories.addAsGuest(formData);
        }
        Swal.fire({
          title: 'Success',
          text: 'Story has been added',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this._goToDashboardPage();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        // console.error(error);
      } finally {
        addSubmit.disabled = false;
        addSubmit.innerHTML = 'Add';
      }
    }
  },

  _getFormData() {
    // const nameInput = document.querySelector('#validationCustomStoryName');
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector(
      '#validationCustomDescription',
    );

    return {
      id: new Date().getTime(),
      // name: nameInput.value,
      photo: photoInput.files[0],
      description: descriptionInput.value,
      createdAt: new Date().toISOString(),
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === '' || item === undefined,
    );

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
