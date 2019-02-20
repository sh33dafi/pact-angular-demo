const projectFolder = __dirname;
const pact = require('@pact-foundation/pact-node');
const project = require('./package.json');
const pactBrokerUrl = process.env.npm_config_pactBrokerUrl;
const pactBrokerUsername = process.env.npm_config_pactBrokerUrl;
const pactBrokerPassword = process.env.npm_config_pactBrokerUrl;
const usePassword = !!pactBrokerPassword;
console.log(`Publishing pacts to ${pactBrokerUrl} using password ${usePassword}`);

let options = {
  pactFilesOrDirs: [projectFolder + '/pacts'],
  pactBroker: pactBrokerUrl,
  consumerVersion: project.version,
  tags: ['latest']
};


if (usePassword) {
  options = {
    ...options,
    pactBrokerUsername: pactBrokerUsername,
    pactBrokerPassword: pactBrokerPassword
  };
}

console.log(options);
pact.publishPacts(options).then(function() {
  console.log('Pacts successfully published!');
});
