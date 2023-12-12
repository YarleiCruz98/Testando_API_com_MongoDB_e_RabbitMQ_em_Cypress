describe("POST /users", () => {

  beforeEach(()=>{
    cy.fixture("users/postUser.json").as("userData");
  })

  it("Register a new user", () => {

    cy.get("@userData").then((userData) => {
      const user = userData.users.user

      cy.task("removeUser", user.email);

      cy.postUser(user).then((response) => {
        expect(response.status).to.equal(201);

      });

    });

  });

  it("Duplicate email", () => {

    cy.get("@userData").then((userData) => {
      const user = userData.users.userDuplicateEmail

      cy.task("removeUser", user.email);

      cy.postUser(user);

      cy.postUser(user).then((response) => {
        const { message } = response.body;

        expect(response.status).to.equal(409);
        expect(message).to.equal("Duplicated email!");

      });

    });

  });

  context('Required fields', ()=> {

    it('Name is a required field', () =>{

      cy.get("@userData").then((userData) => {

        const user = userData.users.userNoName

        cy.task("removeUser", user);

        cy.postUser(user);
  
        cy.postUser(user).then((response) => {
          const { message } = response.body;
  
          expect(response.status).to.equal(400);
          expect(message).to.equal('ValidationError: "name" is not allowed to be empty');
  
        });
      })

    })

    it('Email is a required field', () =>{

      cy.get("@userData").then((userData) => {

        const user = userData.users.userNoEmail

        cy.task("removeUser", user);

        cy.postUser(user);
  
        cy.postUser(user).then((response) => {
          const { message } = response.body;
  
          expect(response.status).to.equal(400);
          expect(message).to.equal('ValidationError: "email" is not allowed to be empty');
  
        });
      })

    })

    it('Password is a required field', () =>{

      cy.get("@userData").then((userData) => {

        const user = userData.users.userNoPassword

        cy.task("removeUser", user);

        cy.postUser(user);
  
        cy.postUser(user).then((response) => {
          const { message } = response.body;
  
          expect(response.status).to.equal(400);
          expect(message).to.equal('ValidationError: "password" is not allowed to be empty');
  
        });
      })

    })

  })
  

  context('Deleting required fields', () => {

    it('name is a required field', ()=> {

      cy.get("@userData").then((userData) => {

        const user = userData.users.user

        delete user.name

        cy.postUser(user)
          .then(response => {
    
            const {message} = response.body
            
            expect(response.status).to.equal(400);
            expect(message).to.equal('ValidationError: \"name\" is required')
    
          })

      })
  
    })

    it('email is a required field', ()=> {

      cy.get("@userData").then((userData) => {

        const user = userData.users.user

        delete user.email

        cy.postUser(user)
          .then(response => {
    
            const {message} = response.body
            
            expect(response.status).to.equal(400);
            expect(message).to.equal('ValidationError: \"email\" is required')
    
          })

      })
  
    })

    it('password is a required field', ()=> {

      cy.get("@userData").then((userData) => {

        const user = userData.users.user

        delete user.password

        cy.postUser(user)
          .then(response => {
    
            const {message} = response.body

            expect(response.status).to.equal(400);
            expect(message).to.equal('ValidationError: \"password\" is required')
    
          })

      })
  
    })

  })

});
