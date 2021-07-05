import store from 'store2';
import { stringify } from 'qs';
import { url } from './service-utils.js';
import request from './request.js';

// 获取列表数据
export function getListData(searchParams) {
  const newData = { corpid: store.session('corpid') };
  return request(`${url.url}/perm/dept/collect?${stringify(newData)}`, {
    method: 'POST',
    data: searchParams,
  });
}

// 获取部门阅读详情
export async function getDepartReadDetail(params) {
  const newData = {...params, corpid: store.session('corpid') };
  return request(`${url.url}/perm/dept/detail?${stringify(newData)}`);
}


// 获取全部阅读详情
export async function getAllUserList(params) {
  return request(`${url.url}/perm/dept/userDetail?${stringify(params)}`);
}

// 开始导出
export async function startExport(params) {
  return request(`${url.url}/statistic/save?${stringify(params)}`, {
    method: 'POST',
    data: params,
  });
}

// 开始导出部门列表明细
export async function startExportCollect(params) {
  return request(`${url.url}/statistic/exportCollect?${stringify(params)}`, {
    method: 'POST',
    data: params,
  });
}