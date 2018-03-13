describe('Fridge Foodie', function () {
  it('should function correctly', function () {
    cy.visit('https://fridge-foodie.firebaseapp.com')
    cy.title().should('include', 'Fridge Foodie')
    cy.get('a').click()
      .url().should('be', '/app.html')
    cy.get('input').type('Roberto')
    cy.get('button').click()
    cy.contains('recipes').should('not.be.empty')
    cy.contains('戻す').click()
      .url().should('be', 'https://fridge-foodie.firebaseapp.com')
  })
})