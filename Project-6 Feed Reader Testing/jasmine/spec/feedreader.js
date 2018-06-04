/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds instanceof Array).toBeTruthy();
        expect(allFeeds.length).toBeGreaterThan(0);
      });

      // This test loops through each feed and determines if the URL is
      // defined and not empty.
      it("have URLs defined and it is not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
          expect(feed.url).toMatch(/^(http|https):\/\//);
        });
      });

      // This test looped through each feed and determines that each
      // feed has a name and is not empty.
      it("have names", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(typeof feed.name).toBe("string");
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    // test suite "The menu"
    describe("The menu", function() {
      // This test ensures the menu element is hidden by default.
      var body = document.body;
      var menuIcon = document.querySelector(".menu-icon-link");

      //This test will validate the proper functioning of the hamburger menu toggle
      it("is hidden by default", function() {
        expect(body.className).toContain("menu-hidden");
      });

      // This tests when the menu should be display.
      it("shows and hides properly when menu icon is clicked", function() {
        menuIcon.click();
        expect(body.className).not.toContain("menu-hidden");
        // This tests when should be menu hide.
        menuIcon.click();
        expect(body.className).toContain("menu-hidden");
      });
    });

    // Initial entries test suite.
    describe("Initial Entries", function() {
      // beforeEach allows for use of asynchronous loadFeed().
      beforeEach(function(done) {
        // Avoid duplicated setup before loading feed
        loadFeed(0, function() {
          done();
        });
      });

      // tests that there is at least one entry in feed.
      it("has at least one .entry element", function(done) {
        var entries = document.querySelectorAll(".feed .entry");
        expect(entries.length).toBeGreaterThan(0);
        done();
      });

      // test suite "New Feed Selection"
      // tests new content is loaded by loadFeed().
      describe("New Feed Selection", function() {
        var title;
        beforeEach(function(done) {
          loadFeed(0, function() {
            title = document.querySelector(".header-title").innerHTML;
            loadFeed(1, function() {
              done();
            });
          });
        });

        it("changes its loaded content", function(done) {
          var newTitle = document.querySelector(".header-title").innerHTML;
          expect(title).not.toEqual(newTitle);
          done();
        });
      });
    });
  })()
);
