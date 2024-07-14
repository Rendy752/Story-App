import ApiEndpoint from '../config/api-endpoint';
import http from './http';

const Stories = {
  async getAll() {
    return await http.get(ApiEndpoint.GET_ALL_STORY);
  },

  async getById(id) {
    return await http.get(ApiEndpoint.GET_DETAIL_STORY(id));
  },

  async add({ description, photo }) {
    const getCurrentLocation = () =>
      new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, () => resolve(null));
      });

    try {
      const position = await getCurrentLocation();
      const data = new FormData();
      data.append('description', description);
      data.append('photo', photo);

      if (position) {
        data.append('lat', position.coords.latitude);
        data.append('lon', position.coords.longitude);
      }

      return await http.post(ApiEndpoint.ADD_STORY, data);
    } catch (error) {
      console.error('Error making request:', error);
      throw error;
    }
  },

  async addAsGuest({ description, photo }) {
    const getCurrentLocation = () =>
      new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, () => resolve(null));
      });

    try {
      const position = await getCurrentLocation();
      const data = new FormData();
      data.append('description', description);
      data.append('photo', photo);

      if (position) {
        data.append('lat', position.coords.latitude);
        data.append('lon', position.coords.longitude);
      }

      return await http.post(ApiEndpoint.ADD_STORY_GUEST_ACCOUNT, data);
    } catch (error) {
      console.error('Error making request:', error);
      throw error;
    }
  },
};

export default Stories;
