import axios from 'axios';
import Config from '../config/config';
import Utils from '../utils/utils';

const http = axios.create({
  baseURL: Config.BASE_URL,
});

http.interceptors.request.use(
  function (config) {
    const userToken = Utils.getUserToken(Config.USER_TOKEN_KEY);
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    if (
      config.method === 'post' &&
      config.data &&
      !(config.data instanceof FormData)
    ) {
      const formData = new FormData();
      Object.keys(config.data).forEach((key) =>
        formData.append(key, config.data[key]),
      );
      config.data = formData;
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default http;
