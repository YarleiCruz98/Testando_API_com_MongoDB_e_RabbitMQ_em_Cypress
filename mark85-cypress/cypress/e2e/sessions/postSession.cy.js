describe ('Post /sessions', ()=>{
    beforeEach(()=>{
        cy.fixture("sessions/postSession.json").as("userData");
    })

    it('user session', ()=> {
        cy.get('@userData').then((userData) => {

            const user = userData.user

            cy.task('removeUser', user)
            cy.postUser(user)

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.user.name).to.equal(user.name)
                    expect(response.body.user.email).to.equal(user.email)
                    expect(response.body.token).not.to.be.empty

                })
        })        
    })

    it('invalid password', ()=> {
        cy.get('@userData').then((userData) => {
            const user = userData.user

            user.password = 'wrongPassword'

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.equal(401)
                })
        })        
    })

    it('invalid email', ()=> {
        cy.get('@userData').then((userData) => {

            const user = userData.user

            user.email = 'Yarlei_wrongemail@gmail.com'

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.equal(401)
                })
        })        
    })

})