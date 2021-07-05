import { ENV } from './utils.js';

const urlCollect = {
  // 开发环境
  dev: {
    mock: '/mock',
    url: '//aly-test.api.xiaoyuanhao.com/yunzhi-statistic-module-test/mobile',
  },
  // 测试环境
  test: {
    mock: '/mock',
    url: '//aly-test.api.xiaoyuanhao.com/yunzhi-statistic-module-test/mobile',
  },
  // 生产环境
  production: {
    url: '//yunzhi-statistic-module.api.xiaoyuanhao.com/mobile',
  },
};

export const url = urlCollect[ENV];
