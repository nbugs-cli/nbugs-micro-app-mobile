import * as Sentry from '@sentry/browser';
import { ENV } from './service/utils.js';

if (ENV === 'production') {
  // Sentry.init({ dsn: 'http://7b24fae9283c4a0caa9d76da82a1d564@47.110.165.108:9000/2' });
}

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
