const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

Given('I open the home page', function () {
    browser.url("./");
});

When('I click on the CTA button', function () {
    browser.click('.fancy.button.large');
});

Then(/I expect to be on the (\w+) page/, function (pageName) {
    var pages = {
        home: {
            url: ('/'),
            title: 'Robot Parts Emporium'
        },
        product: {
            url: ('/product-page.html'),
            title: 'Totally Not Evil Sentient Robot - Robot Parts Emporium',
        }
    };

    var page = pages[pageName];
    var title = browser.getTitle();
    expect(title).to.equal(page.title);

    var url = browser.getUrl();
    expect(url).to.include(page.url, 'URl is mismatch');
});