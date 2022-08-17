describe("empty spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:3000");

		cy.contains("netflix");
		cy.url().should("include", "/search");

		cy.get("#search").type("shade").should("have.value", "shade");
		cy.get("#btnSearch").click();

		cy.url().should("include", "/search/shade");
	});
});
