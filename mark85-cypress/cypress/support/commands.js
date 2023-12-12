// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
