describe('components: Rect component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=rect--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Rect!');
  });
});
