describe('Log in page initialisation', () => {
  it('you can find the log in page, submit button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").should('exist');
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-submit']").should('exist');
    cy.get("[data-cy='login-submit']").should('be.disabled');
  });
})

// remember to delete hi@gmail.com every time before running
describe('Log in page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").click();
  });

  it('field 1 empty, submit button should be disabled', () => {
    cy.get("[data-cy='login-password']").type('password123');
    cy.get("[data-cy='login-submit']").should('be.disabled');
  });
  it('field 2 empty, submit button should be disabled', () => {
    cy.get("[data-cy='login-password']").type('user@example.com');
    cy.get("[data-cy='login-submit']").should('be.disabled');
  });
  it('password field below 6 chars, submit button should be disabled', () => {
    cy.get("[data-cy='login-email']").type('user@example.com');
    cy.get("[data-cy='login-password']").type('passw');
    cy.get("[data-cy='login-submit']").should('be.disabled');
  });
  it('both fields are filled properly, button should be enabled', () => {
    cy.get("[data-cy='login-email']").type('user@example.com');
    cy.get("[data-cy='login-password']").type('password123');
    cy.get("[data-cy='login-submit']").should('not.be.disabled');
  });

  it('displays toast error for invalid email', () => {
    cy.get("[data-cy='login-email']").type('user');
    cy.get("[data-cy='login-password']").type('password123');
    cy.get("[data-cy='login-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'invalid email');
  });

  it('displays toast error for incorrect password', () => {
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('password123');
    cy.get("[data-cy='login-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'wrong password');
  });

  it('log in successfully, redirect to homepage', () => {
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.location('pathname').should('eq', '/');
  });

})