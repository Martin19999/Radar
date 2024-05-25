describe('Log out flow', () => {
  it('log out successfully', () => {
    cy.visit('http://localhost:3000');
    // sign in first
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.wait(5000);
    // log out
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='logout-menuitem']").click();
    cy.get("[data-cy='login-button']").should('exist');
    cy.get("[data-cy='signup-button']").should('exist');
  });
})

