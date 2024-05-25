describe('find change password flow', () => {
  it('you can find the change password window, submit button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-changepassword']").click();
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
})

describe('Change password function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='settings-changepassword']").click();
  });

  it('field 1 empty, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaaa1');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaaa1');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('field 2 empty, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaaa1');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('field 3 empty, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaaa1');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
 
  it('password field1 below 6 chars, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaa');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaaa1');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaaa1');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('new password != confirm new password, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaa2');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaa3');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('new password = old password, submit button should be disabled', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaaa');
    cy.get("[data-cy='accountsettings-submit']").should('be.disabled');
  });
  it('All fields are filled properly, button should be enabled, but inccorect old password, so error message', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaa2a');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaa2');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaa2');
    cy.get("[data-cy='accountsettings-submit']").click();
    cy.get('.chakra-toast', {timeout: 10000}).should('contain', 'wrong password');
  });

  it('change password successfully', () => {
    cy.get("[data-cy='changepassword-oldpassword']").type('aaaaaa');
    cy.get("[data-cy='changepassword-newpassword']").type('aaaaaa1');
    cy.get("[data-cy='changepassword-confirmnewpassword']").type('aaaaaa1');
    cy.get("[data-cy='accountsettings-submit']").click();
    // log out
    cy.wait(7000);
    cy.get("[data-cy='accountsettings-popupclose']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='logout-menuitem']").click();
    // log in
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa1');
    cy.get("[data-cy='login-submit']").click();
    cy.location('pathname').should('eq', '/');
    // change back??
  });

})