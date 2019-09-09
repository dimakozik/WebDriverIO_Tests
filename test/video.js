browser.addCommand('isVideoPaused', () => {
    var isPaused = browser.selectorExecute('#dance-video', (video) => {

        return video[0].paused;
    });
    return isPaused;
});

describe('About us video', () => {
    beforeEach(() => {
        browser.url('./');
        browser.click('=About Us'); // wdio locked to a link with text About us 
    });

    it('should open the modal with video paused', () => {
        var isPaused = browser.isVideoPaused();

        expect(isPaused).to.be.true;
    });

    it('play video on "play" click', () => {
        browser.click('#play-btn');

        var isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.false;
    });

    it('pause video on "pause" click', () => {
        browser.click('#play-btn');
        browser.pause(500);
        browser.click('#pause-btn');

        var isPaused = browser.isVideoPaused();
        expect(isPaused).to.be.true;
    });
});