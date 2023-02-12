import type { Actions } from './$types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const actions = {
	default: async ({cookies, request}) => {

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;
    
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

			});

	}
} satisfies Actions;
