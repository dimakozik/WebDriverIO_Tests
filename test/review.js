var request = require('sync-request');
var reviewForm = require('./reviewForm.page.js');
var Review = require('./Review.page');

describe("The product review form", function () {

    beforeEach(() => {
        browser.url("./product-page.html");
    });

    it("should add a review when submittedd properly", function () {

        reviewForm.submit("email@example.com", "This is the review");

        var hasReview = browser.isExisting(".comment=This is the review");

        expect(hasReview, "Comment text exists").to.be.true;
    })

    it("should show an error message if the input is wrong", () => {
        var isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.false;

        reviewForm.submit();

        var isErrorShowing = reviewForm.formError.isVisible();
        expect(isErrorShowing).to.be.true;
    });

    it("should show an error message if the input is corrected", () => {

        reviewForm.submit();

        var isErrorShowing = reviewForm.emailError.isVisible();
        expect(isErrorShowing).to.be.true;
        reviewForm.submit("email@example.com");

        browser.click("#review-content");

        var isErrorShowing = reviewForm.emailError.isVisible();
        expect(isErrorShowing).to.be.false;

        reviewForm.submit("email@example.com", "This is the review");

        var isMainErrorShowing = reviewForm.formError.isVisible();
        var isContentErrorShowing = reviewForm.formError.isVisible();

        expect(isMainErrorShowing).to.be.false;
        expect(isContentErrorShowing).to.be.false;
    });

    it("should focus on the first invalid input field on error", () => {

        var emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email should not have focus").to.be.false;

        reviewForm.submit();

        emailHasFocus = browser.hasFocus("#review-email");
        expect(emailHasFocus, "email should now have focus").to.be.true;

        reviewForm.submit("email@example.com");

        contentHasFocus = browser.hasFocus("#review-content");
        expect(contentHasFocus, "content should now have focus").to.be.true;
    });

    it('should allow multiple reviews', () => {
        var res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');

        var comments = JSON.parse(res.getBody().toString('utf8'));
        comments.forEach((comment, idx) => {
            if (idx <= 6) {
                reviewForm.submit(comment.email, comment.name);
                var review = new Review(idx + 3);

                var email = review.email.getText();
                expect(email).to.equal(comment.email);

                var reviewText = review.comment.getText();
                expect(reviewText).to.equal(comment.name);
            }
        })
    });
});