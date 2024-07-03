// Import our custom CSS
import '../sass/vendors-extensions/main.scss';

// Import javascript file as needed
import * as bootstrap from 'bootstrap';

// Import lit components
import './components/NavbarContent';
import './components/FooterContent';

const fetchData = require('../public/data/DATA');

const main = async () => {
  const data = await fetchData();
  if (data) {
    console.log(data);
  } else {
    console.log('Failed to fetch data');
  }
};

main();
