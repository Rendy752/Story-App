import Config from './config';

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  ADD_STORY: `${Config.BASE_URL}/stories`,
  ADD_STORY_GUEST_ACCOUNT: `${Config.BASE_URL}/stories/guest`,
  GET_ALL_STORY: `${Config.BASE_URL}/stories`,
  GET_DETAIL_STORY: (id) => `${Config.BASE_URL}/stories/${id}`,
};

export default ApiEndpoint;
