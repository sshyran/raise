describe('LENDER', function() {
  beforeEach(function() {
    cy.butterCMS();
    cy.login('lender');
    cy.mockAPI('lender');
    cy.web3('lender');
    cy.setCookie('X-Canary', 'activated');
  });
  it('Invest', function() {
    cy.visit(Cypress.env('url'));
    cy.get('#btn-warning-close', { timeout: 120000 }).should('have.length', 1);
    cy.get('#btn-warning-close').click();
    cy.addLoanAndCard('CREATED');
    cy.checkFakeDai(); // Send totally fake GraphQL daiBalances ws message
    cy.get('#btn-lender-open').should('have.length', 1);
    cy.get('#btn-lender-open').click();
    cy.wait(300);
    cy.get('#btn-invest-all').should('have.length', 1);
    cy.wait(300);
    cy.get('.small > .content').matchImageSnapshot('modal_invest_lender_empty');
    cy.get('#btn-invest-all').click({ force: true });
    cy.get('#btn-check-term-condition-invest').check({ force: true });
    cy.get('#btn-check-auth-term-condition-invest').check({ force: true });
    cy.get('#btn-invest-confirm').should('have.length', 1);
    cy.wait(300);
    cy.get('.small > .content').matchImageSnapshot('modal_invest_lender_full');
    cy.get('#btn-invest-confirm').click();
    cy.wait(300);
    cy.get('#modal-success').matchImageSnapshot('modal_success');
  });
});
