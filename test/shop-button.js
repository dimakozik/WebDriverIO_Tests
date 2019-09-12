describe('shop CTA button', function () {
    it('should link to the product page', function () {
        browser.url('./');

        var title = browser.getTitle();
        // assert.equal(title, "Robot Parts Emporium");
        expect(title).to.equal('Robot Parts Emporium');

        browser.checkElement('.shop-callout a');

        browser.click('.shop-callout a');

        var productTitle = browser.getTitle();
        // assert.equal(productTitle, "Totally Not Evil Sentient Robot - Robot Parts Emporium");
        expect(productTitle).to.equal('Totally Not Evil Sentient Robot - Robot Parts Emporium');

        var url = browser.getUrl();
        // assert.include(url, "product-page.html", "URl is mismatch");
        expect(url).to.include('product-page.html', 'URl is mismatch');
    });
});