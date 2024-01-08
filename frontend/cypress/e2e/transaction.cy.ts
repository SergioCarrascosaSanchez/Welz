describe('Transaction', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create Transaction', () => {
    const description = 'transaction';
    const value = '100';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        accounts: [{ id: 0, name: 'Account', balance: 1000 }],
        budget: {
          expensesCategories: [
            {
              id: 10,
              name: 'Category',
              max: 100,
              color: 'red',
            },
          ],
        },
      },
    }).as('get-data');

    cy.intercept('PUT', 'http://127.0.0.1:8000/id?auth=token', {
      statusCode: 200,
      body: {},
    }).as('send-data');

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
        interception.request.body.transactions[0].budgetCategory,
        10
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

  it('Edit Transaction', () => {
    const description = 'transaction';
    const description2 = 'edited';
    const value = 100;
    const now = new Date();
    const date = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
      -2
    )}-20T16:53:31.198Z`;

    cy.intercept('GET', `http://127.0.0.1:8000/${id}?auth=${token}`, {
      statusCode: 200,
      body: {
        username: username,
        dailyBalance: [
          {
            time: `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
              -2
            )}-20`,
            value: 1000,
          },
        ],
        transactions: [
          {
            id: 0,
            description: description,
            value: value,
            date: date,
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: 1000 }],
        budget: {
          expensesCategories: [
            {
              id: 10,
              name: 'Category',
              max: 100,
              color: 'blue',
            },
          ],
        },
      },
    }).as('get-data');

    cy.intercept('PUT', 'http://127.0.0.1:8000/id?auth=token', {
      statusCode: 200,
      body: {},
    }).as('send-data');

    login();

    cy.wait('@get-data');

    cy.visit('/user/transactions');

    cy.contains(description);
    cy.contains(value);
    cy.contains('Category');

    cy.get('#three-dots-icon').click();

    cy.contains('Editar').click();

    cy.get('[placeholder="Descripcion"]').clear().type(description2);

    cy.get('[type="submit"]').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(
        interception.request.body.transactions[0].description,
        description2
      );
      assert.equal(interception.request.body.transactions[0].value, value);
      assert.equal(
        interception.request.body.transactions[0].budgetCategory,
        10
      );
      assert.equal(interception.request.body.transactions[0].account, 0);
      assert.equal(interception.request.body.transactions[0].id, 0);
    });

    cy.contains('Transacción registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(description2);
    cy.contains(value);
    cy.contains('Category');

    cy.contains('No hay ninguna transacción.').should('not.exist');

    cy.contains('Cuentas').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description2);
    cy.contains(value);
    cy.contains('Category');

    cy.contains('Presupuesto').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description2);
    cy.contains(value);
    cy.contains('Category');
  });

  it('Delete Transaction', () => {
    const description = 'transaction';
    const value = 100;
    const now = new Date();
    const date = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
      -2
    )}-20T16:53:31.198Z`;

    cy.intercept('GET', `http://127.0.0.1:8000/${id}?auth=${token}`, {
      statusCode: 200,
      body: {
        username: username,
        dailyBalance: [
          {
            time: `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(
              -2
            )}-20`,
            value: 1000,
          },
        ],
        transactions: [
          {
            id: 0,
            description: description,
            value: value,
            date: date,
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: 1000 }],
        budget: {
          expensesCategories: [
            {
              id: 10,
              name: 'Category',
              max: 300,
              color: 'green',
            },
          ],
        },
      },
    }).as('get-data');

    cy.intercept('PUT', 'http://127.0.0.1:8000/id?auth=token', {
      statusCode: 200,
      body: {},
    }).as('send-data');

    login();

    cy.wait('@get-data');

    cy.visit('/user/transactions');

    cy.contains(description);
    cy.contains(value);
    cy.contains('Category');

    cy.get('#three-dots-icon').click();

    cy.contains('Eliminar').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);

      console.log(interception.request.body);
      assert.equal(interception.request.body.transactions.length, 0);
    });

    cy.contains(description).should('not.exist');
    cy.contains(value).should('not.exist');
    cy.contains('Category').should('not.exist');

    cy.contains('No hay ninguna transacción.');

    cy.contains('Cuentas').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description).should('not.exist');

    cy.contains('Presupuesto').click();

    cy.get('#arrow-down-icon').click();
    cy.contains(description).should('not.exist');
  });

  const login = () => {
    cy.visit('/auth');

    cy.intercept('http://127.0.0.1:8000/login', {
      statusCode: 200,
      body: {
        localId: id,
        email: email,
        idToken: token,
      },
    }).as('login');

    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Contraseña"]').type(password);

    cy.get('button').click();

    cy.wait('@login');
  };
});
