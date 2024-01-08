describe('Budget category', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create Budget category', () => {
    const description = 'test';
    const max = '100';

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

    cy.contains('No hay categorias. Añadelas en el apartado de Presupuesto');
    cy.visit('/user/budget');

    cy.get('button[id="add-icon"]').first().click();

    cy.get('[placeholder="Descripción"]').type(description);
    cy.get('[placeholder="Cantidad máxima mensual"]').type(max);
    cy.get('.color-box').first().click();

    cy.contains('Añadir categoría').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      cy.log(interception.request.body);
      assert.equal(
        interception.request.body['budget']['incomeCategories'][0].name,
        description
      );
      assert.equal(
        interception.request.body['budget']['incomeCategories'][0].max,
        max
      );
    });

    cy.contains('Categoría registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(description);
    cy.contains(max);

    cy.contains(
      'No hay categorias. Añadelas en el apartado de Presupuesto'
    ).should('not.exist');
  });

  it('Edit Budget category', () => {
    const description = 'test';
    const description2 = 'edited';
    const max = 100;

    const transactionDescription = 'transaction';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        balance: 0,
        transactions: [
          {
            id: 0,
            description: transactionDescription,
            value: 10,
            date: '2023-11-20T16:53:31.198Z',
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: 1000 }],
        budget: {
          expensesCategories: [
            {
              id: 10,
              name: description,
              max: max,
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

    cy.visit('/user/budget');

    cy.contains('Movimientos').click();
    cy.contains(description);

    cy.contains('Presupuesto').click();

    cy.get('#three-dots-icon').last().click();

    cy.contains('Editar').click();

    cy.get('[placeholder="Descripción"]').clear().type(description2);

    cy.get('[type=submit]').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      cy.log(interception.request.body);
      assert.equal(
        interception.request.body['budget']['expensesCategories'][0].name,
        description2
      );
      assert.equal(
        interception.request.body['budget']['expensesCategories'][0].max,
        max
      );
    });

    cy.contains('Categoría registrada con éxito');

    cy.get('.close-button').click();

    cy.contains(description2);
    cy.contains(max);

    cy.contains('Movimientos').click();
    cy.contains(description2);
  });

  it('Delete Budget category', () => {
    const description = 'testDesc';
    const max = 100;

    const transactionDescription = 'transaction';

    cy.intercept('GET', 'http://127.0.0.1:8000/*', {
      statusCode: 200,
      body: {
        username: username,
        balance: 0,
        transactions: [
          {
            id: 0,
            description: transactionDescription,
            value: 10,
            date: '2023-11-20T16:53:31.198Z',
            account: 0,
            budgetCategory: 10,
          },
        ],
        accounts: [{ id: 0, name: 'Account', balance: 1000 }],
        budget: {
          expensesCategories: [
            {
              id: 10,
              name: description,
              max: max,
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

    cy.visit('/user/budget');

    cy.contains('Movimientos').click();
    cy.contains(description);

    cy.contains('Presupuesto').click();

    cy.get('#three-dots-icon').last().click();

    cy.contains('Eliminar').click();

    cy.wait('@send-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      cy.log(interception.request.body);
      assert.equal(
        interception.request.body['budget']['expensesCategories'].length,
        0
      );
      assert.equal(interception.request.body['transactions'].length, 0);
    });

    cy.contains(description).should('not.exist');
    cy.contains(max).should('not.exist');

    cy.contains('Movimientos').click();
    cy.contains(description).should('not.exist');
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
