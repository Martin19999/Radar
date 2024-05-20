describe('Sign up page initialisation', () => {
  it('you can find the sign up page, submit button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='signupbutton-explicit']").should('exist');
    cy.get("[data-cy='signupbutton-explicit']").click();
    cy.get("[data-cy='signup-submit']").should('exist');
    cy.get("[data-cy='signup-submit']").should('be.disabled');
  });
})

// remember to delete hi@gmail.com every time before running
describe('Sign up page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='signupbutton-explicit']").click();
  });

  it('field 1 empty, submit button should be disabled', () => {
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").should('be.disabled');
  });
  it('field 2 empty, submit button should be disabled', () => {
    cy.get("[data-cy='signup-email']").type('user@example.com');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").should('be.disabled');
  });
  it('field 3 empty, submit button should be disabled', () => {
    cy.get("[data-cy='signup-email']").type('user@example.com');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-submit']").should('be.disabled');
  });
  it('password field below 6 chars, submit button should be disabled', () => {
    cy.get("[data-cy='signup-email']").type('user@example.com');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('passw');
    cy.get("[data-cy='signup-submit']").should('be.disabled');
  });
  it('all three fields are filled properly, button should be enabled', () => {
    cy.get("[data-cy='signup-email']").type('user@example.com');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").should('not.be.disabled');
  });

  it('displays toast error for invalid email', () => {
    cy.get("[data-cy='signup-email']").type('user');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'invalid email');
  });

  it('displays toast error for email already in use', () => {
    cy.get("[data-cy='signup-email']").type('test@gmail.com');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'in use');
  });

  // remember to delete hi@gmail.com every time before running
  it('signup successfully, redirect to homepage, show modal', () => {
    cy.get("[data-cy='signup-email']").type('hi@gmail.com');
    cy.get("[data-cy='signup-displayName']").type('username');
    cy.get("[data-cy='signup-password']").type('password123');
    cy.get("[data-cy='signup-submit']").click();
    // cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'success');
    cy.url().should('include', '/');
    cy.get('#chakra-modal-modal-freshuser', { timeout: 10000 }).should('be.visible');
  });

})