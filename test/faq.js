describe("Homepage FAQ Accordion", function () {
    beforeEach(function () {
        browser.url("./");
    });
    it("should show first section on page load", function () {
        var firstHeight = browser.getCssProperty(".accordion .accordion-item:first-child .accordion-content", "height");

        expect(firstHeight.parsed.value).to.be.greaterThan(0);
    });

    it("should not show other content", function () {
        var secondDisplay = browser.getCssProperty(".accordion .accordion-item:nth-of-type(2) .accordion-content", "display");

        expect(secondDisplay.value).to.equal("none");
    });

    it("should expand/hide content on click", function () {
        browser.click(".accordion .accordion-item:nth-of-type(2) a");
        browser.pause(500);

        var secondHeight = browser.getCssProperty(".accordion .accordion-item:nth-of-type(2) .accordion-content", "height");

        expect(secondHeight.parsed.value).to.be.greaterThan(0);

        var firstDisplay = browser.getCssProperty(".accordion .accordion-item:first-child .accordion-content", "display");

        expect(firstDisplay.value).to.equal("none");
    });

    it("should handle multiple clicks in rapid seccession", function () {
        for (var x = 0; x < 20; x++) {
            var num = (x % 3) + 1;
            browser.click(".accordion .accordion-item:nth-of-type(" + num + ") a");
        }

        var classnames = browser.getAttribute(".accordion .accordion-item:nth-of-type(" + num + ")", "class");
        browser.pause(500);
        expect(classnames).to.contain('is-active');
    });
});