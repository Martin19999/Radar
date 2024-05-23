describe('find change profile picture flow', () => {
  it('you can find the change pfp', () => {
    cy.visit('http://localhost:3000');
    // cy.get("[data-cy='login-button']").click();
    // cy.get("[data-cy='login-email']").type('test@gmail.com');
    // cy.get("[data-cy='login-password']").type('aaaaaa');
    // cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='profilesettings-profiletab']").click(); 
    cy.get("[data-cy='profilesettings-changepfp-edit']").should('not.be.disabled')
  });

  it('allows a user to upload, crop, and save a new profile picture', () => {
    cy.visit('http://localhost:3000');
    cy.get("[data-cy='setting-button']").click();
    cy.get("[data-cy='settings-menuitem']").click();
    cy.get("[data-cy='profilesettings-profiletab']").click(); 

    cy.fixture('pfp.png', 'base64').then(fileContent => {
      cy.get('[data-cy="profilesettings-changepfp-input"]').selectFile({
        contents: fileContent,
        fileName: 'pfp.png',
        mimeType: 'image/png',
        encoding: 'base64',
      }, { action: 'select' });  
    });

    cy.get("[data-cy='profilesettings-changepfp-crop']").should('be.enabled');
    cy.get("[data-cy='profilesettings-changepfp-save']").should('be.disabled');

    cy.get("[data-cy='profilesettings-changepfp-crop']").click();

    cy.get("[data-cy='profilesettings-changepfp-crop']").should('be.disabled');
    cy.get("[data-cy='profilesettings-changepfp-save']").should('be.enabled');

    // // simulate the move
    // cy.get("[data-cy='profilesettings-changepfp-crop']").click(); 

    // cy.get("[data-cy='profilesettings-changepfp-crop']").should('be.enabled');
    // cy.get("[data-cy='profilesettings-changepfp-save']").should('be.disabled');

    // cy.get("[data-cy='profilesettings-changepfp-crop']").click(); 
    cy.get("[data-cy='profilesettings-changepfp-save']").click(); 
  });
})

