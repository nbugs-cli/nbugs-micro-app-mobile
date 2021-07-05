import axios from 'axios';
import Toast from 'nbugs-mobile-toast';
import reLogin from '../utils/utils.js';

export default function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    return axios({
      url,
      withCredentials: true,
      ...options,
    })
      .then(response => {
        const { data } = response || {};
        if (data.code === 200 || data.code === 0) {
          resolve(data.data || data.result);
        } else if (data.code === 302) {
          // 重新登录
          reLogin({ isGoToHome: true });
          reject(data || {});
        } else {
          // reject(data || response);
          Toast.hide();
          Toast.info(data.msg || data.message || data.data || '网络错误，请重试');
          reject({ msg: data.msg || data.message || data.data });
        }
      })
      .catch(err => {
        Toast.hide();
        const { response } = err;
        const { data = {} } = response || {};
        // reject(data);
        Toast.info(data.msg || data.message || data.error || '网络错误，请重试');
        reject(data || {});
      });
  });
}
