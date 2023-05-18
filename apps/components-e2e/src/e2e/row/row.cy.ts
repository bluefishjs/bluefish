describe('components: Row component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=row--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Row!');
  });
});
