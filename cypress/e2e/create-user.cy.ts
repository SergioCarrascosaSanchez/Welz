describe('Create user', () => {
  it('Create user', () => {
    const id: string = 'id';
    const email: string = 'test@test.com';
    const password: string = 'password1212';
    const username: string = 'test-username';
    const token: string = 'token';

    cy.intercept(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*',
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
    ).as('signup');

    cy.intercept(
      'PUT',
      'https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app/*',
      {
        statusCode: 200,
        body: {
          username: username,
          balance: 0,
        },
      }
    ).as('initialize-data');

    cy.intercept(
      'GET',
      `https://budget-app-96883-default-rtdb.europe-west1.firebasedatabase.app//${id}.json?auth=${token}`,
      {
        statusCode: 200,
        body: {
          username: username,
          balance: 0,
        },
      }
    ).as('get-data');

    cy.visit('/');
    cy.contains('Pruébala ahora').click();

    cy.contains('No tengo cuenta').click();

    cy.get('[placeholder="Nombre"]').type(username);
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Contraseña"]').type(password);
    cy.get('[placeholder="Repite la contraseña"]').type(password);

    cy.get('button').click();

    cy.wait('@signup').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(interception.request.body['email'], email);
      assert.equal(interception.request.body['password'], password);
      assert.equal(interception.request.body['returnSecureToken'], true);
    });

    cy.wait('@initialize-data').then((interception) => {
      assert.isNotNull(interception.request.body);
      assert.equal(interception.request.body['username'], username);
      assert.equal(interception.request.body['balance'], 0);
    });

    cy.contains('Hola, ' + username).click();
  });
});
