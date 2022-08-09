describe('App', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
    cy.intercept('http://localhost:3001/api/v1/urls', {
      method: 'GET',
      fixture: './fixtures/urls.json'
    })
  })
  it('Should have title Url Shortner on page', () => {
    cy.contains('URL shortner')
  })

  it('Should have the stored urls displaying on page', () => {
    cy.get('.url').should('have.length', 1)
    .and('contain', 'Woah Look')
    .and('contain','http://localhost:3001/useshorturl/1')
    .and('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
})
