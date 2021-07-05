import store from 'store2';
import { stringify } from 'qs';
import { url } from './service-utils.js';
import request from './request.js';
import requestWXConfig from './requestConfig.js';

const params = { corpid: store.session('corpid') };

/**
 * 获取微信配置信息
 */
export function getWXConfig() {
  const newData = { corpid: store.session('corpid') };
  return requestWXConfig(`//auth.xiaoyuanhao.com/wxauth/getWxSignature?${stringify(newData)}`);
}

/**
 * v1.2新增了审批逻辑
 * 区分权限情况
 * response data: 1 可收不可发，2 可发，3 可审批不可发 4 可发可审批
 * 提供者： 蒋东明
 */
export function getIdentity(params) {
  const newData = { ...params, corpid: store.session('corpid') };
  return request(`${url.route}/bell/common/route?${stringify(newData)}`);
}

/**
 * v1.3获取用户userName,phone
 * 提供者： 蒋东明
 */
export function getUserInfo(params) {
  const newData = { ...params, corpid: store.session('corpid') };
  return request(`${url.route}/bell/common/wx/user?${stringify(newData)}`);
}

/**
 * 发件箱-能否一键提醒
 * 提供者： 陈新
 */
export function isRemind(seacheParams) {
  const newData = { ...seacheParams, corpid: store.session('corpid'), applicationId: 365 };
  return request(`${url.update}/bell/remind?${stringify(newData)}`);
}

/**
 * 详情页-删除
 * 提供者： 陈新
 */
export function fetchDelete(seacheParams) {
  const newData = { ...seacheParams, corpid: store.session('corpid'), applicationId: 365 };
  return request(`${url.update}/bell/delete?${stringify(newData)}`, {
    method: 'DELETE',
  });
}

/**
 * 详情页-立即发布
 * 提供者： 蒋东明
 */
export function fetchPublish(seacheParams) {
  const newData = { corpid: store.session('corpid'), applicationId: 365 };
  return request(`${url.update}/bell/county/wx/publish?${stringify(newData)}`, {
    method: 'POST',
    data: seacheParams,
  });
}

/**
 * 上传文件
 * 提供者： 张学良
 */
export function fileUpdate(params) {
  return request(`${url.upload}/file/upload`, {
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params,
    method: 'post',
  });
}

/**
 * 发件箱-一键提醒
 * 提供者： 陈新
 * @searchParams corpid
 * @searchParams id: 消息的id
 */
export function remind(searchParams) {
  return request(`${url.update}/bell/remind?${stringify({ ...searchParams, ...params })}`, {
    method: 'put',
  });
}
