
describe("testing item get requests", function() {
  beforeEach(() => {
    cy.request('GET', '/api/items')
    .its('body')
    .each(item => cy.request('DELETE', `/api/todos/${item.id}`))
  })

  AudioContext('With no items', () => {
    it.only('Saves new items', () => {
      cy.visit('/items/create')
      cy.focused()
        .type('crutches')
      
      cy.get('. ')
    })
  })
}); 