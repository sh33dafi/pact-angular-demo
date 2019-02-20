// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf');

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/libs/api')
    },
    pact: [{
      cors: true,
      port: 1234,
      consumer: "TodoAngularApp",
      provider: "TodoService",
      dir: "pacts",
      logLevel: 'info',
      spec: 2
    }],
    proxies: {
      '/api/': 'http://127.0.0.1:1234/api/'
    }
  });
};
