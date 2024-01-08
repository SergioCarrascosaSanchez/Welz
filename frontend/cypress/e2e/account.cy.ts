describe('Account', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create account', () => {
    const accountName = 'account';
    const balance = '100';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        balance: 0,
      },
    }).as('get-data');

    cy.intercept('PUT', 'http://127.0.0.1:8000/id?auth=token', {
      statusCode: 200,
      body: {},
    }).as('send-data');

    login();

    cy.wait('@get-data');

    cy.visit('/user/accounts');

    cy.contains('Hola, ' + username).click();

    cy.contains('No hay cuentas bancarias. Añadelas en el apartado de Cuentas');
    cy.contains('No hay ninguna cuenta bancaria.');

    cy.get('button[id="add-icon"]').click();

    cy.get('[placeholder="Nombre de la cuenta"]').type(accountName);
    cy.get('[placeholder="Cantidad inicial"]').type(balance);

    cy.contains('Añadir cuenta bancaria').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(interception.request.body['accounts'][0].name, accountName);
      assert.equal(interception.request.body['accounts'][0].balance, balance);
    });

    cy.contains('Cuenta bancaria registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(accountName);
    cy.contains(balance);

    cy.contains(
      'No hay cuentas bancarias. Añadelas en el apartado de Cuentas'
    ).should('not.exist');
  });

  it('Edit account', () => {
    const accountName = 'account';
    const accountName2 = 'edited';
    const balance = 100;

    const trasactionDescription = 'transaction';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        balance: 0,
        transactions: [
          {
            id: 0,
            description: trasactionDescription,
            value: 10,
            date: '2023-11-20T16:53:31.198Z',
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: balance }],
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

    cy.visit('/user/accounts');

    cy.contains(
      'No hay cuentas bancarias. Añadelas en el apartado de Cuentas'
    ).should('not.exist');

    cy.contains('Movimientos').click();

    cy.contains('No hay ninguna transacción.').should('not.exist');

    cy.contains('Cuentas').click();

    cy.get('#three-dots-icon').click();

    cy.contains('Editar').click();

    cy.get('[placeholder="Nombre de la cuenta"]').clear().type(accountName2);

    cy.get('[type=submit]').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(interception.request.body['accounts'][0].name, accountName2);
      assert.equal(interception.request.body['accounts'][0].balance, balance);
    });

    cy.contains('Cuenta bancaria registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(accountName2);
    cy.contains(balance);
  });

  it('Edit account', () => {
    const accountName = 'account';
    const accountName2 = 'edited';
    const balance = 100;

    const trasactionDescription = 'transaction';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        balance: 0,
        transactions: [
          {
            id: 0,
            description: trasactionDescription,
            value: 10,
            date: '2023-11-20T16:53:31.198Z',
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: balance }],
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

    cy.visit('/user/accounts');

    cy.contains(
      'No hay cuentas bancarias. Añadelas en el apartado de Cuentas'
    ).should('not.exist');

    cy.contains('Movimientos').click();

    cy.contains('No hay ninguna transacción.').should('not.exist');

    cy.contains('Cuentas').click();

    cy.get('#three-dots-icon').click();

    cy.contains('Eliminar').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(interception.request.body['accounts'].length, 0);
      assert.equal(interception.request.body['transactions'], 0);
    });

    cy.contains(accountName2).should('not.exist');
    cy.contains(balance).should('not.exist');

    cy.contains('No hay cuentas bancarias. Añadelas en el apartado de Cuentas');

    cy.contains('Movimientos').click();

    cy.contains('No hay ninguna transacción.');
  });

  const login = () => {
    cy.visit('/auth');

    cy.intercept('http://127.0.0.1:8000/login', {
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
    }).as('login');

    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Contraseña"]').type(password);

    cy.get('button').click();

    cy.wait('@login');
  };
});
