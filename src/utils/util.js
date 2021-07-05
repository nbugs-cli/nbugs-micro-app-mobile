/* eslint-disable prefer-rest-params */
import store from 'store2';

export const switchSendState = status => {
  switch (status) {
    case -1:
      return {
        status: '发布失败',
        sendStateCls: 'red',
      };
    case 0:
      return {
        status: '发布中',
        sendStateCls: 'green',
      };
    case 1:
      return {
        status: '发布成功',
        sendStateCls: 'green',
      };
    case 2:
      return {
        status: '待发布',
        sendStateCls: 'orange',
      };
    case 3:
      return {
        status: '通知撤回',
        sendStateCls: 'grey',
      };
    case 4:
      return {
        status: '审批中',
        sendStateCls: 'blue',
      };
    case 5:
      return {
        status: '审批通过',
        sendStateCls: 'green',
      };
    case 6:
      return {
        status: '审批驳回',
        sendStateCls: 'red',
      };
    case 7:
      return {
        status: '审批撤回',
        sendStateCls: 'grey',
      };
    default:
      return {
        status: '未知状态',
        sendStateCls: '',
      };
  }
};

/* 判断客户端 */
export const judgeClient = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // 判断是否是 android终端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 判断是否是 iOS终端
  console.log(`是否是Android：${isAndroid}`); // true,false
  console.log(`是否是iOS：${isIOS}`);
  if (isAndroid) {
    return 'Android';
  } else if (isIOS) {
    return 'IOS';
  } else {
    return 'PC';
  }
};
