var prodConfig = require('./wdio.conf').config;

var spyfallConfig = Object.assign(prodConfig, {
    capabilities: {
        Host: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        Guest: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    baseUrl: 'http://spyfall.crabhat.com/',
    specs: ['test/spyfall.js']
});

exports.config = spyfallConfig;