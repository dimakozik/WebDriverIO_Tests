var cart = require("./cart.page.js");

describe('Cart functionality', () => {
    beforeEach(() => {
        browser.url("/product-page.html");
    });

    it('should only let you buy after setting a quantity', () => {
        var isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "'buy now' should be disabled by default").to.be.false;

        cart.qty.setValue(10);

        isBtnEnabled = cart.btn.isEnabled();
        expect(isBtnEnabled, "'buy now' is now enabled").to.be.true;
    });

    describe('checkout process', () => {
        beforeEach(() => {
            //add qty
            cart.qty.setValue(10);

            //Click 'buy now'
            cart.btn.click();
        });

        it('should disable buy now button during processing', () => {

            var isBtnEnabled = cart.btn.isEnabled();
            expect(isBtnEnabled, "'buy now' should be disabled after clicking").to.be.false;

            var btnText = cart.btn.getText();
            expect(btnText, "Verify 'but now' text has changed").to.contain("Purchasing");
        });

        it('should ahoqn a thank you message with qty and type', () => {

            cart.thankYou.waitForExist(3000);

            var thankText = cart.thankYou.getText();
            expect(thankText).to.contain("10 T-800 Model 101");
        });

        it('should clear input after completion', () => {
            cart.qty.waitForValue(3000, true);

        });

        it('should reset button text after purchase completes', () => {
            browser.waitUntil(() => {
                return cart.btn.getText() !== 'Purchasing...';
            }, 3000);

            var btnText = cart.btn.getText();
            expect(btnText).to.equal("Buy Now");
        });

        it('should hide thank you message after clicking close button', () => {

            cart.thankYou.waitForExist();

            $(".close-button").click();

            cart.thankYou.waitForVisible(3000, true);
        });

    });
});