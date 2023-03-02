import type { Actions } from './$types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../hooks.server'
import type { user } from '../../user';
import type { PageServerLoad } from "./$types";

export const actions = {
  default: async ({cookies, request}) => {

        const data = await request.formData();
        let email: string = data.get('email') as string;
        let password: string = data.get('password') as string;
    
        const auth = getAuth(app);
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            let user: user = {
              email: email ?? "",
              uid: res.user.uid,
              username: res.user.displayName ?? email.substring(0, email.indexOf('@'))
            }

            cookies.set('user', JSON.stringify(user));
  
            return {"success": true}
        }
        catch(err){
            console.log("error:", err);
            return {"success": false}
        }
  }
} satisfies Actions;


