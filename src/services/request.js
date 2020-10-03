import { MessageBox } from 'element-ui';
import config from '@/config';
import store from '@/store';

const axios = require('axios');

export default (api, data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const timeout = 5000;
  const baseURL = config.API_GATEWAY;
  const instance = axios.create({
    baseURL,
    headers,
    timeout,
    withCredentials: true,
  });

  instance.interceptors.response.use((response) => response,
    (error) => {
      const { response } = error;
      if (response.status === 403) {
        store.dispatch('user/reset');
        MessageBox.confirm('The session expired please login again.', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          closeOnHashChange: false,
          type: 'warning',
        }).then(() => {
          window.location = '/';
        });
        return Promise.reject(new Error(response.message || 'Error'));
      }
      return Promise.reject(error);
    });
  const url = data && data.id ? `${api.url}/${data.id}` : api.url;
  const params = data && data.params ? data.params : null;

  switch (api.method) {
    case 'get':
      return instance.get(url, { params });
    case 'post':
      return instance.post(url, params);
    case 'put':
      return instance.put(url, params);
    case 'delete':
      return instance.delete(url, { params });
    default:
      return null;
  }
};
