import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';
import ApiEndpoint from '../config/api-endpoint';

const Stories = {
  async getAll() {
    return await axios.get(ApiEndpoint.GET_ALL_STORY, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async getById(id) {
    return await axios.get(ApiEndpoint.GET_DETAIL_STORY(id), {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
      },
    });
  },

  async add({ description, photo }) {
    const getCurrentLocation = () =>
      new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, () => resolve(null));
      });

    try {
      const position = await getCurrentLocation();
      const data = { description, photo };

      if (position) {
        data.lat = position.coords.latitude;
        data.lon = position.coords.longitude;
      }

      return await axios.post(ApiEndpoint.ADD_STORY, data, {
        headers: {
          Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
      const data = { description, photo };

      if (position) {
        data.lat = position.coords.latitude;
        data.lon = position.coords.longitude;
      }

      return await axios.post(ApiEndpoint.ADD_STORY_GUEST_ACCOUNT, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error making request:', error);
      throw error;
    }
  },
};

export default Stories;
