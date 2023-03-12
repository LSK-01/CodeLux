
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `cypress${id}`

describe('visits homepage', () => {
  it('visits homepage', () => {
    cy.visit('http://localhost:5173')
  })
})

describe('finds header homepage buttons', () => {
  it('finds log in button and redirects to log in page', () => {
    cy.visit('http://localhost:5173')

    cy.contains('Log in').click()

  })

  it('finds signup button and redirects to signup page', () => {
    cy.visit('http://localhost:5173')

    cy.contains('Sign up').click()

  })
})

describe('can sign up a user', () => {

  it('can sign up user and redirects to dashboard page', () => {
      cy.visit('http://localhost:5173/signup')

      const id = () => Cypress._.random(0, 1e6)
      const signupname = `cypress${id()}@email.com`
  
      cy.get("input[placeholder=Email]").type(signupname);
  
      cy.get("input[placeholder=Password]").click().type("password123").type('{enter}');

      cy.url().should('eq', 'http://localhost:5173/dashboard')
  })


})

describe('can log a user in', () => {
  it('finds log in button and redirects to login page', () => {
    cy.visit('http://localhost:5173/login')

    cy.get("input[placeholder=Email]").type("cypress@email.com");

    cy.get("input[placeholder=Password]").click().type("password123").type('{enter}');

    cy.login("cypress@email.com","password123")
  
    cy.url().should('eq', 'http://localhost:5173/dashboard')

    })    
  })

describe('can log a user out', () => {
  it('logs in a user, then can log it out', () => {
    cy.visit('http://localhost:5173/login')

    cy.get("input[placeholder=Email]").type("cypress@email.com");

    cy.get("input[placeholder=Password]").click().type("password123").type('{enter}');

    cy.login("cypress@email.com","password123")
  
    cy.url().should('eq', 'http://localhost:5173/dashboard')

    cy.contains('Log out').click()

    cy.url().should('eq', 'http://localhost:5173/login')

    })    
  })

  describe('can view all project pages', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')

      cy.get("input[placeholder=Email]").type("cypress@email.com");

      cy.get("input[placeholder=Password]").click().type("password123").type('{enter}');

      cy.login("cypress@email.com","password123")

    })

    it('can view all projects', () => {  
      cy.contains('View all projects').click()

      cy.url().should('eq', 'http://localhost:5173/projects/all')
      })   
      
    it('can view projects at risk', () => {
      cy.contains('Projects at risk').click()

      cy.url().should('eq', 'http://localhost:5173/projects/atrisk')
    })

    it('can view projects with surveys due', () => {
      cy.contains('Projects with surveys due').click()

      cy.url().should('eq', 'http://localhost:5173/projects/surveysdue')
    })

    it('can view projects with tasks due', () => {
      cy.contains('Projects with tasks due').click()

      cy.url().should('eq', 'http://localhost:5173/projects/tasksdue')
    })
    })

  describe('can use a project', () => {
    it('adds a project, takes a survey for it and uses project buttons', () => {
      cy.visit('http://localhost:5173/login')

      cy.get("input[placeholder=Email]").type("cypress@email.com")

      cy.get("input[placeholder=Password]").click().type("password123").type('{enter}')

      cy.login("cypress@email.com","password123")
      
      cy.contains('Add project').dblclick()

      cy.url().should('eq', 'http://localhost:5173/add')



      cy.get("input[placeholder=\"Answer here\"]").type(testname)

      cy.contains('Send').click()

      cy.get("input[placeholder=\"Answer here\"]").type("description")

      cy.contains('Send').click()

      cy.get("select").select("Go")

      cy.contains('Send').click()

      cy.get("input[placeholder=\"Answer here\"]").type("cypress")

      cy.contains('Send').click()

      cy.get("input[placeholder=\"Answer here\"]").type("cypressdev")

      cy.contains('Send').click()

      cy.get("input[placeholder=\"Answer here\"]").type("https://github.com/LSK-01/Hetris")

      cy.contains('Send').click()

      cy.get("input").type("0.01")

      cy.contains('Send').click()

      cy.get("input").type("2023-10-10")

      cy.contains('Send').click()

      cy.get("input").type("2023-11-10")

      cy.contains('Send').click()

      cy.contains(testname).should('exist');

      var pid = "";
      cy.url().then(url => {
        pid = url.split('?')[1];

        cy.visit(`http://localhost:5173/surveys?${pid}`)

        cy.get('[type="radio"]').click({multiple : true})

        cy.contains('Submit survey').click()

        cy.contains("Go to dashboard").should('exist');

        cy.contains("All projects").should('exist');

        cy.visit(`http://localhost:5173/project_overview?${pid}`)

        cy.contains("Mark as complete").click();

      })
  })


  })
