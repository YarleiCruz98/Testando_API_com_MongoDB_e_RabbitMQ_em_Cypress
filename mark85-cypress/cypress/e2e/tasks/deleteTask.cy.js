describe('DELETE /tasks/:id', () => {
    beforeEach(()=>{
        cy.fixture("tasks/deleteTask.json").as("userData");
      })

    it('remove a task', () => {
        cy.get('@userData').then((userData) => {
            const {user, task} = userData.remove


            cy.task('removeTask', task.name, user.email)
            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResp => {
                    cy.postTask(task, userResp.body.token)
                        .then(respTask => {

                            cy.deleteTask(respTask.body._id, userResp.body.token)
                                .then(response => {
                                expect(response.status).to.equal(204)
                            })
                        })
                })
        })
    })

    it('task not found', () => {
        cy.get('@userData').then((userData) => {

            const {user, task} = userData.not_found

            cy.task('removeTask', task.name, user.email)
            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResp => {
                    cy.postTask(task, userResp.body.token)
                        .then(respTask => {
                            cy.deleteTask(respTask.body._id, userResp.body.token)    
                                .then(response => {
                                expect(response.status).to.equal(204)
                            })

                            cy.getUniqueTask(respTask.body._id, userResp.body.token)
                                .then(response => {
                                expect(response.status).to.equal(404)
                            })
                        })
                })
        })
    })

})
