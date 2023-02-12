import { initializeApp } from 'firebase/app';

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