describe('put /tasks/:id/done', () => {
    beforeEach(()=>{
        cy.fixture("tasks/putTask.json").as("userData");
      })

      it('update task to done', () => {
        cy.get('@userData').then((userData) => {
            const {user, task} = userData.update


            cy.task('removeTask', task.name, user.email)
            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResp => {
                    cy.postTask(task, userResp.body.token)
                        .then(respTask => {

                            cy.putTaskDone(respTask.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.equal(204)
                            })

                            cy.getUniqueTask(respTask.body._id, userResp.body.token)
                                .then(response => {
                                expect(response.body.is_done).to.be.true
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

                            cy.putTaskDone(respTask.body._id, userResp.body.token)
                            .then(response => {
                                expect(response.status).to.equal(404)
                            })
                        })
                })
        })
    })

})
