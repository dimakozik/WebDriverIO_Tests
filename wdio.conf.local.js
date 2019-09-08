var prodConfig = require('./wdio.conf').config;

var localConfig = Object.assign(prodConfig, {
    capabilities: [{
        browserName: 'chrome'
    }],
    baseUrl: 'http://localhost:8303',
    services: ['selenium-standalone'],
});

delete localConfig.user;
delete localConfig.key;

exports.config = localConfig;