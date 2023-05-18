describe('components: Group component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=group--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Group!');
  });
});
