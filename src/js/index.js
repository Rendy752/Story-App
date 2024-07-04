// Import our custom CSS
import '../sass/main.scss';
// import '../css/main.css';

// Import lit components
import './components/NavbarContent';
import './components/CarouselContent';
import './components/FooterContent';
import './components/NavLink';
import './components/StoryContent';
import './components/StoryItem';

import Dashboard from './pages/dashboard';
import Add from './pages/story/add';

const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
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
  initPages();

  const route = detectRoute();
  route.init();
});
