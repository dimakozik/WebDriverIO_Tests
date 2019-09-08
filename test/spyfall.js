describe('Spyfall game', () => {
    var gameId;

    it('should allow host to create a game', () => {
        Host.url('./');

        Host.click('#btn-new-game');

        Host.setValue('#player-name', 'Lisa');

        Host.click('#create-game input[type="submit"]');

        Host.waitForExist('h4=Waiting For Players...');

        gameId = Host.getText('.access-code span');

        expect(gameId).to.have.length.above(0);
    });

    it('should allow others to join the game', () => {
        Guest.url('./');

        Guest.click('#btn-join-game');

        Guest.setValue('#access-code', gameId);
        Guest.setValue('#player-name', 'Bob');

        Guest.click('input[value="Join"]');

        Guest.waitForExist('h4=Waiting For Players...');

        expect(Guest.getUrl()).to.contain(gameId);
    });

    it('should show bob in list of names on Host browser', () => {
        Host.waitForExist('li=Bob');

        var playerList = Host.getText('.lobby-player-list li');

        expect(playerList).to.have.length(2);
        expect(playerList[1]).to.equal('Bob');
    });

    it('should allow host to start game', () => {
        Host.click('button=Start Game')

        browser.waitForExist('.game-countdown');

        var isGameStarted = browser.isExisting('.status-container');

        expect(isGameStarted).to.deep.equal({ Host: true, Guest: true });
    });

    it('should assing one person as the spy and not show the location', () => {
        var status = browser.getText('.player-status')

        var spy, notSpy;

        if (status.Host == 'You are the spy!') {
            spy = 'Host';
            notSpy = 'Guest';
        } else {
            spy = 'Guest';
            notSpy = 'Host';
        }

        expect(status[spy]).to.equal('You are the spy!');
        expect(status[notSpy]).to.equal('You are not the spy!');

        var isLocationShowing = browser.isExisting('.current-location');

        expect(isLocationShowing[spy], 'location is not shown to spy').to.be.false;
        expect(isLocationShowing[notSpy], 'location is shown to non-spies').to.be.true;
    });
});