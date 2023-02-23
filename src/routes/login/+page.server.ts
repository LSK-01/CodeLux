import type { Actions } from './$types';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../hooks.server';
import userStore from '../../userStore';
export const actions = {
	default: async ({cookies, request}) => {
        const auth = getAuth(app);

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            cookies.set('email', res.user.email ?? "");
            cookies.set('uid', res.user.uid);
            return {success: true}

        } catch (err) {
            return {success: false}

        }
    }
} satisfies Actions;
