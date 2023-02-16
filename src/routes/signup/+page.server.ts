import type { Actions } from './$types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../hooks.server'
export const actions = {
  default: async ({cookies, request}) => {

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;
    
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user.email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    
  }
} satisfies Actions;

