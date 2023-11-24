describe('Transaction', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create Transaction', () => {
    const description = 'transaction';
    const value = '100';

    cy.intercept(
      'GET',
      'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app/*',
      {
        statusCode: 200,
        body: {
          username: username,
          balance: 0,
          accounts: [{ id: 0, name: 'Account', balance: 1000 }],
          budget: {
            expensesCategories: [
              {
                id: 0,
                name: 'Category',
                max: 100,
                color: 'red',
              },
            ],
          },
        },
      }
    ).as('get-data');

    cy.intercept(
      'PUT',
      'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app//id/.json?auth=token',
      {
        statusCode: 200,
        body: {},
      }
    ).as('send-data');

    login();

    cy.wait('@get-data');

    cy.visit('/user/transactions');

    cy.contains('No hay ninguna transacción.');

    cy.get('button[id="add-primary-icon"]').click();

    cy.get('[placeholder="Descripcion"]').type(description);
    cy.get('[placeholder="Cantidad"]').type(value);
    cy.get('select').first().select('Category');
    cy.get('select').last().select('Account');

    cy.contains('Añadir transacción').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(
        interception.request.body.transactions[0].description,
        description
      );
      assert.equal(interception.request.body.transactions[0].value, value);
      assert.equal(
        interception.request.body.transactions[0].budgetCategory.id,
        0
      );
      assert.equal(interception.request.body.transactions[0].account, 0);
      assert.equal(interception.request.body.transactions[0].id, 0);
    });

    cy.contains('Transacción registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(description);
    cy.contains(value);
    cy.contains('Category');

    cy.contains('No hay ninguna transacción.').should('not.exist');

    cy.contains('Cuentas').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description);
    cy.contains(value);
    cy.contains('Category');

    cy.contains('Presupuesto').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description);
    cy.contains(value);
    cy.contains('Category');
  });

  const login = () => {
    cy.visit('/auth');

    cy.intercept(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=*',
      {
        statusCode: 200,
        body: {
          localId: id,
          email: email,
          displayName: 'name',
          idToken: token,
          registered: true,
          refreshToken: 'refresh_token',
          expiresIn: 3600,
        },
      }
    ).as('login');

    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Contraseña"]').type(password);

    cy.get('button').click();

    cy.wait('@login');
  };
});
