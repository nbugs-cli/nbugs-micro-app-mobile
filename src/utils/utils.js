import store from 'store2';
import router from 'umi/router';
import { parse, stringify } from 'qs';
import Toast from 'nbugs-mobile-toast';
import { name } from '../../package.json';
import { ENV } from '../service/utils.js';
import { ROUTER_HOME } from '../../config/router.config';

// 首页路由
export const HOME = ROUTER_HOME;

/**
 * 重新登录
 * @param {Object} params: 跳转地址参数对象： 默认值：{}
 * @param {String} goToUrl: 跳转地址
 * @param {Boolean} isGoToHome: 是否直接跳转目标地址
 * @param {String} currentUserStr: 判断是否登录的字符串，默认package中的项目名称
 */
export default function reLogin({
  goToUrl = `${HOME}?`,
  params = {},
  isGoToHome = false,
  currentUserStr = name,
} = {}) {
  const corpid = store.session('corpid') || parse(window.location.search.slice(1)).corpid;

  if (!corpid) {
    return Toast.info('缺少 corpid，请添加');
  }

  // 判断是否有登录信息
  const isHasCurrentUser = store.session(`${corpid}_${currentUserStr}_currentUser`);

  // 跳转首页
  if (!isHasCurrentUser || isGoToHome) {
    Toast.loading('加载中');
    router.replace(
      `${goToUrl}${stringify({ corpid, ...params })}&toDetails=1&${
        ENV === 'production' ? 'suiteid=wxa1b0659e918e04a3' : 'agentId=1000030'
      }`,
    );

    return false;
  }
}

/**
 * 将文本中的emoji符号转码传给后台
 * @param str
 * @returns {*}
 */
export function encodeEmoji(str) {
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  const str1 = str.replace(/%/g, '%2525');
  // 检测utf16字符正则
  return str1.replace(patt, char => {
    return char.length === 2 ? encodeURIComponent(encodeURIComponent(char)) : char;
  });
}

export const GetQueryString = str => {
  const regArr = new RegExp(`(^|&)${str}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(regArr);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

// 特殊字符正则判断
export const specialRegex = /[^\u4e00-\u9fa5a-zA-Z\d,.，。？?！；：:"“‘+= 、…^\-*/'·～~@#¥$%&_!—「」【】《》()（）<>{}|[\]]+/;

/**
 * @function 滚动到指定位置方法
 * @param startNum {int} -- 开始位置
 * @param stopNum {int} -- 结束位置
 * @param dom 滑动容器
 */
export const animationToAnchor = (startNum, stopNum, dom) => {
  const scrollDom = dom || window.document.body;
  let nowNum = startNum + 50; // 步进为50

  if (nowNum > stopNum) {
    nowNum = stopNum;
  }

  // 缓动方法
  window.requestAnimationFrame(() => {
    scrollDom.scrollTop = nowNum; // 当前示例页面，滚动条在body，所以滚动body

    // 滚动到预定位置则结束
    if (nowNum === stopNum) {
      return;
    }

    animationToAnchor(nowNum, stopNum, dom); // 只要还符合缓动条件，则递归调用
  });
};

export const throttle = (func, delay) => {
  let timer = null;
  let startTime = Date.now(); // 设置开始时间
  return function() {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime); // 剩余时间
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      // 第一次触发立即执行
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining); // 取消当前计数器并计算新的remaining
    }
  };
};

export function getCookie(cName) {
  let arr = [];
  const reg = new RegExp(`(^| )${cName}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  }
  return null;
}
