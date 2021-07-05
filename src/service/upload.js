import parse from 'nbugs-component-params-parse';
import { stringify } from 'qs';
import { TestDomain } from 'nbugs-mobile-v2-utils';
import request from './request';

const API = '//file.xiaoyuanhao.com';
const proxyApi = 'https://nodeproxy.wxapp.xiaoyuanhao.com';

function requestWrap(method, url, params) {
  /* eslint-disable no-param-reassign */
  const curHostName = window.location.hostname;
  const isProxy = TestDomain('*.codesandbox.io', curHostName);
  const _url = isProxy
    ? `${proxyApi}${url}?${stringify({ $targetHostname: API })}`
    : `${API}${url}`;

  const api = {
    // 接口地址
    url: _url,
    // http请求方法
    method,
    // 接口请求参数，无论是get还是post，都以object的形式传入，组件根据method自动注入参数
    params,
    // 请求超时
    timeout: 1000 * 10,
  };

  return parse.api(api);
  /* eslint-enable */
}

export async function upload(params) {
  return requestWrap('post', '/file/urls', params);
}

export async function getImgInfo(params) {
  const { imgUrl } = params;
  const url = `${imgUrl}?x-oss-process=image/info`;
  return request(url);
}
