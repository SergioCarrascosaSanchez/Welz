describe('Budget category', () => {
  const id: string = 'id';
  const email: string = 'test@test.com';
  const password: string = 'password1212';
  const username: string = 'test-username';
  const token: string = 'token';

  it('Create Budget category', () => {
    const description = 'test';
    const max = '100';

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
