describe('Accordion', () => {
    var activeClass = 'is-active';
    beforeEach(() => {
        browser.url('./');
    })

    it('should have active class on first item to start', () => {
        var classnames = browser.getAttribute('.accordion .accordion-item:first-child', 'class');

        expect(classnames).to.contain('is-active');
    })

    it('should not have active class on other item to start', () => {
        var elementClassnames = browser.getAttribute('.accordion .accordion-item:not(:first-child)', 'class');
        elementClassnames.forEach((classnames) => {
            expect(classnames).to.not.contain('is-active');
        });
    })

    it('should remove active class from first item on click', () => {
        browser.click('.accordion .accordion-item:nth-child(2) a');

        var classnames = browser.getAttribute('.accordion .accordion-item:first-child', 'class');
        expect(classnames).to.not.contain('is-active');
    })

    it('should add active class to second item on click', () => {
        browser.click('.accordion .accordion-item:nth-child(2) a');

        var classnames = browser.getAttribute('.accordion .accordion-item:nth-child(2)', 'class');
        expect(classnames).to.contain('is-active');
    })

    it('should handle multiple clicks in rapid succession', () => {
        for (let x = 0; x < 20; x++) {
            var num = (x % 3) + 1;

            browser.click('.accordion .accordion-item:nth-child(' + num + ') a');
        }

        var classnames = browser.getAttribute('.accordion .accordion-item:nth-child(' + num + ')', 'class');
        expect(classnames).to.contain('is-active');
    });

});