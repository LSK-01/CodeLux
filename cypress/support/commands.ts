/// <reference types="cypress" />

import { initializeApp} from 'firebase/app';
import { getAuth, signOut , signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
	apiKey: 'AIzaSyB_3Kbe8DtKqW12tkDjNiLNblkru7JyhKU',
	authDomain: 'pimp-my-project.firebaseapp.com',
	projectId: 'pimp-my-project',
	storageBucket: 'pimp-my-project.appspot.com',
	messagingSenderId: '1047408725170',
	appId: '1:1047408725170:web:5140028a78519f379d0dab',
	measurementId: 'G-GH4JL70L29'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

Cypress.Commands.add('login', (email, password) => { 
    return signInWithEmailAndPassword(auth, email, password);
 })

 Cypress.Commands.add('logout', () => { 
    return signOut(auth);
 })
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }