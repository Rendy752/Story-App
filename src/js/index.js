import 'bootstrap';
// Import our custom CSS
import '../sass/main.scss';

// Import lit components
import './components/index';

import Dashboard from './pages/dashboard';
import Add from './pages/story/add';
import Profile from './pages/profile';

import CheckUserAuth from './pages/auth/check-user-auth';

const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/profile.html': Profile,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${
      header.clientHeight + footer.clientHeight
    }px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  CheckUserAuth.checkLoginState(async () => {
    const route = detectRoute();
    await route.init();
  });

  initPages();

  const route = detectRoute();
  document
    .querySelector('navbar-content')
    .setAttribute('activeLink', window.location.pathname);
  route.init();
});
