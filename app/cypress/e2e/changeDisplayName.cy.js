describe('find change display name flow', () => {
  it('you can find the change display name window, save button is disabled', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='login-button']").click();
    cy.get("[data-cy='login-email']").type('test@gmail.com');
    cy.get("[data-cy='login-password']").type('aaaaaa');
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='profilesettings-profiletab']").click();
    cy.get("[data-cy='profilesettings-changedisplayname-button']").should('be.disabled');
  });
})

describe('Change email function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='profilesettings-profiletab']").click();
  });

  it('field empty, save button should be disabled', () => {
    cy.get("[data-cy='profilesettings-changedisplayname-name']").clear().type(' ');
    cy.get("[data-cy='profilesettings-changedisplayname-button']").should('be.disabled');
  });

  it('try to add space(s) to new name, save button should be disabled', () => {
    cy.get("[data-cy='profilesettings-changedisplayname-name']").clear().type('tes t');
    cy.get("[data-cy='profilesettings-changedisplayname-button']").should('be.disabled');
  });

  it('change display name successfully', () => {
    cy.get("[data-cy='profilesettings-changedisplayname-name']").clear().type('testt');
    cy.get("[data-cy='profilesettings-changedisplayname-button']").click();
    cy.wait(5000);
    cy.get("[data-cy='profilesettings-changedisplayname-name']").should('have.value', 'testt');
  });

})