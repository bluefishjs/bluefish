describe('components: Align component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=align--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to Align!');
  });
});
