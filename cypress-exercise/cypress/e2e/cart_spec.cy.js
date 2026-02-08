describe('Cart Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Should sort products by price low to high', () => {
  cy.get('.product_sort_container').select('lohi');
  cy.get('.inventory_item_price').first().should('have.text', '$7.99');
  });

  it('Should remove product from cart', () => {
    // Add a product to the cart
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Remove the product
    cy.get('.cart_item').find('.btn_secondary').click();

    // Verify cart is empty - badge should not exist
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Should complete checkout process', () => {
    // Add a product to the cart
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Go to cart
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Click checkout button
    cy.get('#checkout').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Fill in checkout information
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');

    // Click continue
    cy.get('#continue').click();

    // Verify redirected to checkout confirmation page
    cy.url().should('include', '/checkout-step-two.html');
  });
});