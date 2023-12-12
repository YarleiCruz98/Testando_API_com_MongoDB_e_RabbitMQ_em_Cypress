Cypress.Commands.add("postUser", (userData) => {
  cy.api({
    url: "/users",
    method: "POST",
    body: userData,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add('postSession', (userData) => {
  cy.api({
      url: '/sessions',
      method: 'POST',
      body: {email: userData.email, password: userData.password},
      failOnStatusCode: false,
  }).then(response => {return response})
})

Cypress.Commands.add('postTask', (userData, token) => {
  cy.api({
    url: '/tasks',
    method: 'POST',
    body: userData,
    headers: {
        authorization: token
    },
    failOnStatusCode: false
  })  
})

Cypress.Commands.add('getUniqueTask', (taskId, token) => {
  cy.api({
      url: '/tasks/' + taskId,
      method: 'GET',
      headers: {
          authorization: token
      },
      failOnStatusCode: false
  }).then(response => {
      return response
  })
})

Cypress.Commands.add('deleteTask', (taskId, token) => {
  cy.api({
      url: '/tasks/' + taskId,
      method: 'DELETE',
      headers: {
          authorization: token
      },
      failOnStatusCode: false
  }).then(response => {
      return response
  })
})

Cypress.Commands.add('getTasks', (token)  => {
  cy.api({
      url: '/tasks',
      method: 'GET',
      headers: {
          authorization: token
      },
      failOnStatusCode:false
  }).then(response => {
      return response
  })

})

Cypress.Commands.add('putTaskDone', (taskId, token) => {
  cy.api({
      url: `/tasks/${taskId}/done`,
      method: 'PUT',
      headers: {
          authorization: token
      },
      failOnStatusCode: false
  }).then(response => {
      return response
  })
})
