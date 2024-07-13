import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import Auth from '../../network/auth';

const CheckUserAuth = {
  checkLoginState() {
    onAuthStateChanged(auth, (user) => {
      const isUserSignedIn = Boolean(user);
      this._showLoginMenuOrUserLogMenu(isUserSignedIn);
    });
  },

  async _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginBtn = document.querySelector('#loginBtn');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');
    const logoutBtn = document.querySelector('#logoutBtn');

    if (!userLoginState) {
      loginBtn?.classList.add('d-block');
      userLoggedMenu?.classList.add('d-none');
      logoutBtn?.classList.add('d-none');

      loginBtn?.classList.remove('d-none');
      userLoggedMenu?.classList.remove('d-block');
      logoutBtn?.classList.remove('d-block');

      return;
    }

    loginBtn?.classList.add('d-none');
    if (userLoggedMenu) {
      userLoggedMenu.innerHTML = 'Hello, ' + (await Auth.showProfileName());
      userLoggedMenu.classList.add('d-block');
    }
    logoutBtn?.classList.add('d-block');

    loginBtn?.classList.remove('d-block');
    userLoggedMenu?.classList.remove('d-none');
    logoutBtn?.classList.remove('d-none');
  },
};

export default CheckUserAuth;
