const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `cypress${id}`

// describe('visits homepage', () => {
//   it('visits homepage', () => {
//     cy.visit('http://localhost:5173')
//   })
// })

// describe('finds header homepage buttons', () => {
//   it('finds about button and redirects to about page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('ABOUT').dblclick()

//     cy.url().should('eq', 'http://localhost:5173/about')

//   })

//   it('finds login button and redirects to login page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('LOGIN').dblclick()

//     cy.url().should('eq', 'http://localhost:5173/login')

//   })

//   it('finds signup button and redirects to signup page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('SIGNUP').dblclick()

//     cy.url().should('eq', 'http://localhost:5173/signup')

//   })
// })

// describe('finds homepage buttons', () => {

//   it('finds login button and redirects to login page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('Log in').dblclick()

//   })

//   it('finds signup button and redirects to signup page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('Sign Up').dblclick()

//   })
// })

// describe('can sign up a user', () => {

  // it('finds signup button and redirects to signup page', () => {
  //     cy.visit('http://localhost:5173')

  //     cy.contains("Sign Up").dblclick()
  
      // cy.url().should('eq', 'http://localhost:5173/signup')

      // const id = () => Cypress._.random(0, 1e6)
      // const signupname = `cypress${id()}@email.com`
  
      // cy.get("input[placeholder=Email]").type(signupname);
  
      // cy.get("input[placeholder=Password]").type("password123");
  
      // cy.contains('Sign Up').dblclick()
    
  })


// })

// describe('can log a user in', () => {
//   it('finds log in button and redirects to login page', () => {
//     cy.visit('http://localhost:5173')

//     cy.contains('LOGIN').dblclick()

//     cy.url().should('eq', 'http://localhost:5173/login')

//     cy.get("input[placeholder=Email]").type("cypress@email.com");

//     cy.get("input[placeholder=Password]").type("password123");

//     cy.contains('Login').dblclick()

//     cy.login("cypress@email.com","password123")
  
//     cy.url().should('eq', 'http://localhost:5173/dashboard')

//     })    
//   })

//   describe('can view all project pages', () => {
//     beforeEach(() => {
//       cy.visit('http://localhost:5173/login')

//       cy.get("input[placeholder=Email]").type("cypress@email.com");

//       cy.get("input[placeholder=Password]").type("password123");

//       cy.contains('Login').dblclick()

//       cy.login("cypress@email.com","password123")

//     })

//     it('can view all projects', () => {  
//       cy.contains('View projects').click()

//       cy.url().should('eq', 'http://localhost:5173/projects/all')
//       })   
      
//     it('can view projects at risk', () => {
//       cy.contains('Projects at risk').click()

//       cy.url().should('eq', 'http://localhost:5173/projects/atrisk')
//     })

//     it('can view projects with surveys due', () => {
//       cy.contains('Projects with surveys due').click()

//       cy.url().should('eq', 'http://localhost:5173/projects/surveysdue')
//     })

//     // it('can view projects with tasks due', () => {
//     //   cy.contains('Projects with tasks due').click()

//     //   cy.url().should('eq', 'http://localhost:5173/projects/tasksdue')
//     // })
//     })

  // describe('can add a project', () => {
  //   it('adds a project', () => {
  //     cy.visit('http://localhost:5173/login')

  //     cy.get("input[placeholder=Email]").type("cypress@email.com")

  //     cy.get("input[placeholder=Password]").type("password123")

  //     cy.contains('Log in').dblclick()

  //     cy.login("cypress@email.com","password123")
      
  //     cy.contains('Add project').dblclick()

  //     cy.url().should('eq', 'http://localhost:5173/add')



  //     cy.get("input[placeholder=\"Answer here\"]").type(testname)

  //     cy.contains('Send').click()

  //     cy.get("input[placeholder=\"Answer here\"]").type("description")

  //     cy.contains('Send').click()

  //     cy.get("select").select("Go")

  //     cy.contains('Send').click()

  //     cy.get("input[placeholder=\"Answer here\"]").type("cypress")

  //     cy.contains('Send').click()

  //     cy.get("input[placeholder=\"Answer here\"]").type("cypressdev")

  //     cy.contains('Send').click()

  //     cy.get("input[placeholder=\"Answer here\"]").type("https://github.com/LSK-01/Hetris")

  //     cy.contains('Send').click()

  //     cy.get("input").type("0.01")

  //     cy.contains('Send').click()

  //     cy.get("input").type("2023-10-10")

  //     cy.contains('Send').click()

  //     cy.get("input").type("2023-11-10")

  //     cy.contains('Send').click()

  //     cy.contains(testname).should('exist');
  //   })

  // })
