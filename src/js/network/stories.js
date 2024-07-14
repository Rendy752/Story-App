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

  async add({ name, date, amount, type, description, evidence }) {
    const data = { name, date, amount, type, description, evidence };

    return await axios.post(ApiEndpoint.ADD_STORY, data, {
      headers: {
        Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async addAsGuest({ name, date, amount, type, description, evidence }) {
    const data = { name, date, amount, type, description, evidence };

    return await axios.post(ApiEndpoint.ADD_STORY_GUEST_ACCOUNT, data);
  },
};

export default Stories;
