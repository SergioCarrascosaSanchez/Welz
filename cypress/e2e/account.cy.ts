describe('Account', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create account', () => {
    const accountName = 'account';
    const balance = '100';

    cy.intercept(
      'GET',
      'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app/*',
      {
        statusCode: 200,
        body: {
          username: username,
          balance: 0,
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
