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
    console.error('Error fetching data:', error);
    return null;
  }
};

module.exports = fetchData;
