const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchData = require('../../public/data/DATA');
    const data = await fetchData();
    if (!data) {
      throw new Error('Data is not found');
    }
    console.log(data);
    // this._stories = data;
    // this._populateStoriesDataToCard(this._stories);
  },
};

export default Dashboard;
