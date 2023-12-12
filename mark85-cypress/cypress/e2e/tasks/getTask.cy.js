describe('GET /tasks', ()=> {
    
    beforeEach(()=>{
        cy.fixture("tasks/getTask.json").as("userData");
      })
    
    it('get my task', () => {
        cy.get('@userData').then((userData) => {

            const {user, tasks} = userData.list
            cy.task('removeTasksLike', 'Estud4r')
            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(respUser => {
                    tasks.forEach( (t)=>{
                        cy.postTask(t, respUser.body.token)
                    })
                    cy.getTasks(respUser.body.token)    
                        .then(response => {
                        expect(response.status).to.equal(200)
                    }).its('body')
                        .should('be.an', 'array')
                        .and('have.length', tasks.length)
                })
        })
    })

})

describe('GET /tasks/:id', () => {
    beforeEach(()=>{
        cy.fixture("tasks/getTask.json").as("userData");
      })

    it('get unique task', () => {
        cy.get('@userData').then((userData) => {
            const {user, task} = userData.unique


            cy.task('removeTask', task.name, user.email)
            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResp => {
                    cy.postTask(task, userResp.body.token)
                        .then(respTask => {

                            cy.getUniqueTask(respTask.body._id, userResp.body.token)
                                .then(response => {
                                expect(response.status).to.equal(200)
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
