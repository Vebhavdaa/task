describe("React App Tests", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    ).as("getIds");
    cy.visit("http://localhost:3000");
    cy.wait("@getIds");
  });

  it("InitialRender", () => {
    cy.get('[data-testid="site-appbar"]').should("exist");
    cy.get('[data-testid="new-button"]').should("exist");
    cy.get('[data-testid="past-button"]').should("exist");
    cy.get('[data-testid="news-card"]').should("have.length", 5);
    cy.get('[data-testid="load-more-button"]').should("exist");
    cy.get('[data-testid="footer-appbar"]').should("exist");
  });

  it("VerifyNewButtonClick", () => {
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    ).as("getNewStories");
    cy.get('[data-testid="new-button"]').should(
      "have.css",
      "background-color",
      "rgb(242, 242, 242)"
    );
    cy.get('[data-testid="new-button"]').click();
    cy.wait("@getNewStories").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
      }
      expect(interception.request.url).to.eq(
        "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
      );
      cy.get('[data-testid="new-button"]').should(
        "have.css",
        "background-color",
        "rgb(251, 201, 27)"
      );
    });
    cy.get('[data-testid="news-card"]').should("have.length", 5);
  });

  it("VerifyPastButtonClick", () => {
    cy.get('[data-testid="past-button"]').click();
    cy.get('[data-testid="past-button"]').should(
      "have.css",
      "background-color",
      "rgb(242, 242, 242)"
    );

    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    ).as("getTopStories");
    cy.get('[data-testid="new-button"]').click();
    cy.get('[data-testid="past-button"]').click();
    cy.wait("@getTopStories").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
      }
      expect(interception.request.url).to.eq(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      );
      cy.get('[data-testid="past-button"]').should(
        "have.css",
        "background-color",
        "rgb(251, 201, 27)"
      );
    });
    cy.get('[data-testid="news-card"]').should("have.length", 5);
  });

  it("VerifyLoadMoreButton", () => {
    cy.get('[data-testid="news-card"]')
      .its("length")
      .then((initialLength) => {
        cy.get('[data-testid="load-more-button"]').click();
        cy.get('[data-testid="news-card"]')
          .its("length")
          .should("eq", initialLength + 5);
      });
  });

  it("VerifyNewsCardNavigation", () => {
    cy.get('[data-testid="news-link"]')
      .should("have.attr", "target", "_blank")
      .then(($link) => {
        const href = $link.attr("href");
        if (href) {
          cy.request(href).then((response) => {
            expect(response.status).to.equal(200);
          });
        } else {
          throw new Error("Link href attribute is undefined");
        }
      });
  });
});
