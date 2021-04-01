/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {

  };
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564202202179_675';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ]
}
    config.cors = {
       origin: '*', // 匹配规则  域名+端口  *则为全匹配
       allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cluster = {
    listen: {
      path: '',
      port: 6990,
      hostname: '0.0.0.0',
    }
  };
  return {
    ...config,
    ...userConfig
  };
};
