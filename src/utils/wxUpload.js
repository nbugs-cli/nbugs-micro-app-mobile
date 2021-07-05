const WX = window.wx;

function wrapPromise(fnName, params) {
  return new Promise((fullfilled, reject) => {
    if (typeof WX[fnName] !== 'function') {
      return reject(new Error(`wx.${fnName} is not function`));
    }
    WX[fnName]({
      ...params,
      success(res) {
        const { errMsg } = res;
        if (errMsg === `${fnName}:ok`) {
          fullfilled(res);
        } else {
          reject(errMsg);
        }
      },
      fail(err) {
        reject(err.errMsg);
      },
    });
  });
}

// 拍照或从手机相册中选图
export function chooseImage(params) {
  return wrapPromise('chooseImage', params);
}

// 上传图片
export function uploadImage(params) {
  return wrapPromise('uploadImage', params);
}

// 获取图片base64资源
export function getLocalImgData(params) {
  return wrapPromise('getLocalImgData', params);
}
