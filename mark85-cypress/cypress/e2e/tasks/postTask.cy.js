describe('POST /tasks', ()=> {


    beforeEach(()=>{
        cy.fixture("tasks/postTask.json").as("userData");
      })

    it('register a new task', () => {
        cy.get('@userData').then((userData) => {

            const {user, task} = userData.create

            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {
                    cy.task('removeTask', user.name, user.email)
                    cy.postTask(task, userResponse.body.token)
                        .then(response => {
                            expect(response.status).to.equal(200)
                            expect(response.body.name).to.equal(task.name)
                            expect(response.body.tags).to.eql(task.tags)
                            expect(response.body.is_done).to.equal(false)
                            expect(response.body.user).to.equal(userResponse.body.user._id)
                            expect(response.body._id.length).to.equal(24)
                        })
                })
        })    
    })

    it('Duplicated taks', () => {
        cy.get('@userData').then((userData) => {

            const {user, task} = userData.duplicated

            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(userResponse => {

                    cy.task('removeTask', user.name, user.email)
                    cy.postTask(task, userResponse.body.token)
                    cy.postTask(task, userResponse.body.token)
                        .then(response => {
                            expect(response.status).to.equal(409)
                            expect(response.body.message).to.equal('Duplicated task!')
                
                        })
                })
        })    
    })
})