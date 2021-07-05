import axios from 'axios';
import Toast from 'nbugs-mobile-toast';

export default function requestWXConfig(url, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options,
    })
      .then(response => {
        const { data } = response;
        resolve(data);
      })
      .catch(response => {
        const { data = {} } = response;
        if (data.code === 'ECONNABORTED') {
          Toast.info('网络请求超时，请重试');
        } else {
          reject(response);
        }
      });
  });
}
