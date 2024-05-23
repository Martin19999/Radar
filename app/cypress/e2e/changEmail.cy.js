describe('find change email flow', () => {
  it('you can find the change email window, submit button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-changeemail']").click();
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
})

describe('Change email function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-changeemail']").click();
  });

  it('field 1 empty, submit button should be disabled', () => {
    cy.get("[data-cy='changeemail-newemail']").type('password123');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('field 2 empty, submit button should be disabled', () => {
    cy.get("[data-cy='changeemail-password']").type('user@example.com');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
 
  it('password field below 6 chars, submit button should be disabled', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaaa');
    cy.get("[data-cy='changeemail-newemail']").type('test@gmail.com');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('both fields are filled properly, button should be enabled, but inccorect password, so error message', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaava');
    cy.get("[data-cy='changeemail-newemail']").type('test3@gmail.com');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'wrong password');
  });
  it('email is invalid, so error message', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaaaa');
    cy.get("[data-cy='changeemail-newemail']").type('testam');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'invalid email');
  });

  it('email is already in use, so error message', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaaaa');
    cy.get("[data-cy='changeemail-newemail']").type('test2@gmail.com');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'email already in use');
  });

  it('new email is the same as old email, button disabled', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaaaa');
    cy.get("[data-cy='changeemail-newemail']").type('test@gmail.com');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });

  it('change email successfully', () => {
    cy.get("[data-cy='changeemail-password']").type('aaaaaa');
    cy.get("[data-cy='changeemail-newemail']").type('testy@gmail.com'); 
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get("[data-cy='email-label']", {timeout: 10000}).should('have.text', 'Current Email: testy@gmail.com');
  });

})