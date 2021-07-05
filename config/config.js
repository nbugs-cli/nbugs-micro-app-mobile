/* eslint-disable no-empty-pattern */
import SentryPlugin from '@sentry/webpack-plugin';
import routes from './router.config';
import { version, name } from '../package.json';

const getPublishPath = env => {
  console.log(`${name}:${version}`);
  console.log(`env:${env.BUILD_ENV}`);

  switch (env.BUILD_ENV) {
    case 'test':
      return `//cdn.xiaoyuanhao.com/test/${name}/${version}/`;
    case 'production':
      return `//s.xiaoyuanhao.com/${name}/${version}/`;
    default:
      return '/';
  }
};

// ref: https://umijs.org/config/
export default {
  targets: {
    ios: 9,
    safari: 9,
    ie: 9,
  },
  devtool: process.env.BUILD_ENV === 'production' ? 'nosources-source-map' : 'source-map',
  disableCSSSourceMap: true,
  chainWebpack(config, {}) {
    // if (process.env.BUILD_ENV === 'production') {
    //   config.plugin('sentry').use(SentryPlugin, [
    //     {
    //       ignore: ['node_modules', 'mock'],
    //       include: './dist',
    //       configFile: './.sentryclirc',
    //       release: version, // ?
    //       // urlPrefix: version,
    //     },
    //   ]);
    // }
  },
  publicPath: getPublishPath(process.env),
  treeShaking: true,
  routes,
  context: {
    user_agent_type: 'weixin',
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'mobile-safe-clock',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
