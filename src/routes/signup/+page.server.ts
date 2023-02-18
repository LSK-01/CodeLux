import type { Actions } from './$types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../hooks.server'

export const actions = {
  default: async ({cookies, request}) => {

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;
    
        const auth = getAuth(app);
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            cookies.set('email', res.user.email ?? "");
            cookies.set('uid', res.user.uid);
            return {"success": true}
        }
        catch(err){
            console.log("error:", err);
            return {"success": false}
        }
  }
} satisfies Actions;

