describe('App', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urls.json'})
    cy.visit('localhost:3000')
  })
  it('Should have title Url Shortener on page', () => {
    cy.contains('URL Shortener')
  })

  it('Should have the stored urls displaying on page', () => {
    cy.get('.url').should('have.length', 1)
    .and('contain', 'Woah Look')
    .and('contain','http://localhost:3001/useshorturl/1')
    .and('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('Should reflect when user types into form', () => {
    cy.get('form').find('input').eq(0).type('Great Title')
    cy.get('form').find('input').eq(0).should('have.value','Great Title')
    cy.get('form').find('input').eq(1).type('https://www.istockphoto.com/photo/3d-illustration-background-of-jellyfish-jellyfish-swims-in-the-ocean-sea-light-gm1033700106-276801817?phrase=jellyfish')
    cy.get('form').find('input').eq(1).should('have.value','https://www.istockphoto.com/photo/3d-illustration-background-of-jellyfish-jellyfish-swims-in-the-ocean-sea-light-gm1033700106-276801817?phrase=jellyfish')
  })

  it('Should be able to submit url and see the new shortened url on page', () => {
    cy.get('form').find('input').eq(0).type('Great Title')
    cy.get('form').find('input').eq(1).type('https://www.istockphoto.com/photo/3d-illustration-background-of-jellyfish-jellyfish-swims-in-the-ocean-sea-light-gm1033700106-276801817?phrase=jellyfish')
    cy.get('button').click().intercept('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      fixture:'responseUrls.json',
    })
    cy.reload()
    cy.get('.url').should('have.length', 2)
    cy.get('.url').eq(1).should('contain','Great Title')
    .and('contain', 'https://www.istockphoto.com/photo/3d-illustration-background-of-jellyfish-jellyfish-swims-in-the-ocean-sea-light-gm1033700106-276801817?phrase=jellyfish')
    .and('contain', 'https://tinyurl.com/yckzurra')
  })
})
