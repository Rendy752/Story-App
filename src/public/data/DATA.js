const { default: Swal } = require('sweetalert2');

const fetchData = async () => {
  const url =
    'https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.listStory;
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
};

module.exports = fetchData;
