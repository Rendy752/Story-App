const Utils = {
  setUserToken(key, value) {
    return sessionStorage.setItem(key, value);
  },
  setUserName(key, value) {
    return sessionStorage.setItem(key, value);
  },
  getUserToken(key) {
    return sessionStorage.getItem(key);
  },
  getUserName(key) {
    return sessionStorage.getItem(key);
  },
  destroyUserToken(key) {
    return sessionStorage.removeItem(key);
  },
  destroyUserName(key) {
    return sessionStorage.removeItem(key);
  },
};

export default Utils;
