import store from 'store2';

/**
 * 网页加水印
 *
 * @export
 * @param {*} [{
 *   container = document.body,
 *   width = '400px',
 *   height = '300px',
 *   textAlign = 'center',
 *   textBaseline = 'middle',
 *   font = "20px Microsoft Yahei",
 *   fillStyle = 'rgba(230, 230, 230, 0.8)',
 *   content = '保密水印',
 *   rotate = '10',
 *   zIndex = -1000
 * }={}]
 * @returns
 */
export default function waterMarkLoader() {
  /* Just return a value to define the module export. */
  const watermark = {};

  const { userName = '', mobile = '' } = store.session('userInfo') || {};

  const defaultSettings = {
    watermark_id: 'wm_div_id', // 水印总体的id
    watermark_prefix: 'mask_div_id', // 小水印的id前缀
    watermark_txt: `${userName || ''}${(mobile || '').slice(-4)}`, // 水印的内容
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 0, // 水印行数
    watermark_cols: 0, // 水印列数
    watermark_x_space: 50, // 水印x轴间隔
    watermark_y_space: 50, // 水印y轴间隔
    watermark_font: '微软雅黑', // 水印字体
    watermark_color: 'black', // 水印字体颜色
    watermark_fontsize: '18px', // 水印字体大小
    watermark_alpha: 0.08, // 水印透明度，要求设置在大于等于0.005
    watermark_width: 100, // 水印宽度
    watermark_height: 100, // 水印长度
    watermark_angle: 15, // 水印倾斜度数
    watermark_parent_width: 0, // 水印的总体宽度（默认值：body的scrollWidth和clientWidth的较大值）
    watermark_parent_height: 0, // 水印的总体高度（默认值：body的scrollHeight和clientHeight的较大值）
    watermark_parent_node: null, // 水印插件挂载的父元素element,不输入则默认挂在body上
  };

  /* 加载水印 */
  const loadMark = function() {
    /* 采用配置项替换默认值，作用类似jquery.extend */
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      const src = arguments[0] || {};
      for (const key in src) {
        if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
          continue;
        } else if (src[key] || src[key] === 0) defaultSettings[key] = src[key];
        /* veronic: resolution of watermark_angle=0 not in force */
      }
    }

    /* 如果元素存在则移除 */
    const watermarkElement = document.getElementById(defaultSettings.watermark_id);
    if (watermarkElement) {
      const _parentElement = watermarkElement.parentNode;
      if (_parentElement) {
        _parentElement.removeChild(watermarkElement);
      }
    }

    /* 获取页面最大宽度 */
    let pageWidth =
      Math.max(document.body.scrollWidth, document.body.clientWidth) -
      defaultSettings.watermark_width / 2;
    /* 获取页面最大长度 */
    let pageHeight =
      Math.max(
        document.body.scrollHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ) -
      defaultSettings.watermark_height / 2;

    const setting = arguments[0] || {};
    const parentEle = defaultSettings.watermark_parent_node;

    let pageOffsetTop = 0;
    let pageOffsetLeft = 0;
    if (setting.watermark_parent_width || setting.watermark_parent_height) {
      setting.watermark_parent_width
        ? (pageWidth = setting.watermark_parent_width - defaultSettings.watermark_width / 2)
        : defaultSettings.watermark_parent_node
        ? (pageWidth = parentEle.offsetWidth - defaultSettings.watermark_width / 2)
        : void 0;
      setting.watermark_parent_height
        ? (pageHeight = setting.watermark_parent_height - defaultSettings.watermark_height / 2)
        : defaultSettings.watermark_parent_node
        ? (pageHeight =
            Math.max(parentEle.offsetHeight, parentEle.scrollHeight) -
            defaultSettings.watermark_height / 2)
        : void 0;

      /* 指定父元素同时指定了宽或高 */
      if (parentEle) {
        pageOffsetTop = parentEle.offsetTop || 0;
        pageOffsetLeft = parentEle.offsetLeft || 0;
        defaultSettings.watermark_x += pageOffsetLeft;
        defaultSettings.watermark_y += pageOffsetTop;
      }
    } else if (parentEle) {
      pageOffsetTop = parentEle.offsetTop || 0;
      pageOffsetLeft = parentEle.offsetLeft || 0;
      pageWidth = parentEle.offsetWidth - defaultSettings.watermark_width / 2 || 0;
      pageHeight =
        Math.max(parentEle.offsetHeight, parentEle.scrollHeight) -
          defaultSettings.watermark_height / 2 || 0;

      defaultSettings.watermark_x += pageOffsetLeft;
      defaultSettings.watermark_y += pageOffsetTop;
    }

    /* 创建水印外壳div */
    let otdiv = document.getElementById(defaultSettings.watermark_id);
    let shadowRoot = null;

    if (!otdiv) {
      otdiv = document.createElement('div');

      /* 创建shadow dom */
      otdiv.id = defaultSettings.watermark_id;
      otdiv.setAttribute('style', 'pointerEvents: none !important; display: block !important');
      otdiv.style.pointerEvents = 'none';

      /* 判断浏览器是否支持attachShadow方法 */
      if (typeof otdiv.attachShadow === 'function') {
        /* createShadowRoot Deprecated. Not for use in new websites. Use attachShadow */
        shadowRoot = otdiv.attachShadow({ mode: 'open' });
      } else {
        shadowRoot = otdiv;
      }

      /* 将shadow dom随机插入body内的任意位置 */
      const nodeList = document.body.children;
      const index = Math.floor(Math.random() * (nodeList.length - 1));
      if (nodeList[index]) {
        document.body.insertBefore(otdiv, nodeList[index]);
      } else {
        document.body.appendChild(otdiv);
      }
    } else if (otdiv.shadowRoot) {
      shadowRoot = otdiv.shadowRoot;
    }

    /* 三种情况下会重新计算水印列数和x方向水印间隔：1、水印列数设置为0，2、水印长度大于页面长度，3、水印长度小于于页面长度 */
    const frontWidth =
      defaultSettings.watermark_x +
      pageOffsetLeft +
      defaultSettings.watermark_width * defaultSettings.watermark_cols +
      defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1);
    if (
      defaultSettings.watermark_cols === 0 ||
      frontWidth + defaultSettings.watermark_width < pageWidth ||
      frontWidth > pageWidth
    ) {
      defaultSettings.watermark_cols = parseInt(
        (pageWidth - defaultSettings.watermark_x + pageOffsetLeft) /
          (defaultSettings.watermark_width + defaultSettings.watermark_x_space),
        10,
      );
      const tempWatermarkXSpace = parseInt(
        (pageWidth -
          defaultSettings.watermark_x +
          pageOffsetLeft -
          defaultSettings.watermark_width * defaultSettings.watermark_cols) /
          defaultSettings.watermark_cols,
        10,
      );
      defaultSettings.watermark_x_space = tempWatermarkXSpace
        ? defaultSettings.watermark_x_space
        : tempWatermarkXSpace;
    }

    /* 三种情况下会重新计算水印列数和x方向水印间隔：1、水印列数设置为0，2、水印长度大于页面长度，3、水印长度小于于页面长度 */
    const frontHeight =
      defaultSettings.watermark_y +
      pageOffsetTop +
      defaultSettings.watermark_height * defaultSettings.watermark_rows +
      defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1);
    if (
      defaultSettings.watermark_rows === 0 ||
      frontHeight + defaultSettings.watermark_height < pageHeight ||
      frontHeight > pageHeight
    ) {
      defaultSettings.watermark_rows = parseInt(
        (pageHeight - defaultSettings.watermark_y + pageOffsetTop) /
          (defaultSettings.watermark_height + defaultSettings.watermark_y_space),
        10,
      );
      const tempWatermarkYSpace = parseInt(
        (pageWidth -
          defaultSettings.watermark_x +
          pageOffsetLeft -
          defaultSettings.watermark_width * defaultSettings.watermark_cols) /
          defaultSettings.watermark_cols,
        10,
      );
      defaultSettings.watermark_y_space = tempWatermarkYSpace
        ? defaultSettings.watermark_y_space
        : tempWatermarkYSpace;
    }

    let x;
    let y;
    for (let i = 0; i < defaultSettings.watermark_rows; i += 1) {
      y =
        defaultSettings.watermark_y +
        (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (let j = 0; j < defaultSettings.watermark_cols; j++) {
        x =
          defaultSettings.watermark_x +
          (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

        const maskDiv = document.createElement('div');
        const oText = document.createTextNode(defaultSettings.watermark_txt);
        maskDiv.appendChild(oText);
        /* 设置水印相关属性start */
        maskDiv.id = defaultSettings.watermark_prefix + i + j;
        /* 设置水印div倾斜显示 */
        maskDiv.style.webkitTransform = `rotate(-${defaultSettings.watermark_angle}deg)`;
        maskDiv.style.MozTransform = `rotate(-${defaultSettings.watermark_angle}deg)`;
        maskDiv.style.msTransform = `rotate(-${defaultSettings.watermark_angle}deg)`;
        maskDiv.style.OTransform = `rotate(-${defaultSettings.watermark_angle}deg)`;
        maskDiv.style.transform = `rotate(-${defaultSettings.watermark_angle}deg)`;
        maskDiv.style.visibility = '';
        maskDiv.style.position = 'absolute';
        /* 选不中 */
        maskDiv.style.left = `${x}px`;
        maskDiv.style.top = `${y}px`;
        maskDiv.style.overflow = 'hidden';
        maskDiv.style.zIndex = '9999999';
        maskDiv.style.opacity = defaultSettings.watermark_alpha;
        maskDiv.style.fontSize = defaultSettings.watermark_fontsize;
        maskDiv.style.fontFamily = defaultSettings.watermark_font;
        maskDiv.style.color = defaultSettings.watermark_color;
        maskDiv.style.textAlign = 'center';
        maskDiv.style.width = `${defaultSettings.watermark_width}px`;
        maskDiv.style.height = `${defaultSettings.watermark_height}px`;
        maskDiv.style.display = 'block';
        maskDiv.style['-ms-user-select'] = 'none';
        /* 设置水印相关属性end */
        shadowRoot.appendChild(maskDiv);
      }
    }
  };

  /* 移除水印 */
  const removeMark = function() {
    /* 采用配置项替换默认值，作用类似jquery.extend */
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      const src = arguments[0] || {};
      for (const key in src) {
        if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key]) {
          continue;
        } else if (src[key] || src[key] === 0) defaultSettings[key] = src[key];
        /* veronic: resolution of watermark_angle=0 not in force */
      }
    }

    /* 移除水印 */
    const watermarkElement = document.getElementById(defaultSettings.watermark_id);
    const _parentElement = watermarkElement.parentNode;
    _parentElement.removeChild(watermarkElement);
  };

  /* 初始化水印，添加load和resize事件 */
  watermark.init = function(settings) {
    window.addEventListener('load', function() {
      loadMark(settings);
    });
    window.addEventListener('resize', function() {
      loadMark(settings);
    });
    window.addEventListener('DOMContentLoaded', function() {
      loadMark(settings);
    });
  };

  /* 手动加载水印 */
  watermark.load = function(settings) {
    loadMark(settings);
    window.watermarkLoad = true;
  };

  /* 手动移除水印 */
  watermark.remove = function() {
    removeMark();
    window.watermarkLoad = false;
  };

  window.watermark = watermark;

  return watermark;
}
