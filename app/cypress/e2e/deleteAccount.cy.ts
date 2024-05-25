describe('find delete account flow', () => {
  it('you can find the delete account window, submit button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-deleteaccount']").click();
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
})

describe('Change email function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-deleteaccount']").click();
  });

  it('field 1 empty, submit button should be disabled', () => {
    cy.get("[data-cy='deleteaccount-confirmphrase']").type('delete my account');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('field 2 empty, submit button should be disabled', () => {
    cy.get("[data-cy='deleteaccount-password']").type('aaaaaa');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
 
  it('password field below 6 chars, submit button should be disabled', () => {
    cy.get("[data-cy='deleteaccount-password']").type('aaaaa');
    cy.get("[data-cy='deleteaccount-confirmphrase']").type('delete my account');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('confirm phrase is not exactly "delete my account", submit button should be disabled', () => {
    cy.get("[data-cy='deleteaccount-password']").type('aaaaaa');
    cy.get("[data-cy='deleteaccount-confirmphrase']").type('delete my accont');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });

  it('both fields are filled properly, button should be enabled, but inccorect password, so error message', () => {
    cy.get("[data-cy='deleteaccount-password']").type('aaaaaa1');
    cy.get("[data-cy='deleteaccount-confirmphrase']").type('delete my account');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'wrong password');
  });

  it('delete account successfully', () => {
    cy.get("[data-cy='deleteaccount-password']").type('aaaaaa');
    cy.get("[data-cy='deleteaccount-confirmphrase']").type('delete my account');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.wait(5000);
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'user not found');
  });

})