import { initializeApp } from 'firebase/app';
import userStore from './userStore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
/**
 * @type {import("@firebase/firestore").Firestore}
 */

//firebase initialisation

const firebaseConfig = {
	apiKey: 'AIzaSyB_3Kbe8DtKqW12tkDjNiLNblkru7JyhKU',
	authDomain: 'pimp-my-project.firebaseapp.com',
	projectId: 'pimp-my-project',
	storageBucket: 'pimp-my-project.appspot.com',
	messagingSenderId: '1047408725170',
	appId: '1:1047408725170:web:5140028a78519f379d0dab',
	measurementId: 'G-GH4JL70L29'
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  userStore.set({
	loggedIn: user !== null,
	user: user ? user : undefined
  })
});