describe('components: Distribute component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=distribute--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Distribute!');
  });
});
