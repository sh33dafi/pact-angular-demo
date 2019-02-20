const server = require('./provider').server;

const {
    Verifier
} = require('@pact-foundation/pact');
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);

describe('Pact Verification', () => {

    it('should validate the expectations of Matching Service',  function () { // lexical binding required here

        this.timeout(10000);
        let opts = {
            provider: 'TodoService',
            providerBaseUrl: 'http://localhost:9000',
            pactBrokerUrl: 'http://localhost',
            publishVerificationResult: true,
            providerVersion: '0.0.0'
        };

        return new Verifier().verifyProvider(opts)
            .then(output => {
                console.log('Pact Verification Complete!');
            })
    });
});
