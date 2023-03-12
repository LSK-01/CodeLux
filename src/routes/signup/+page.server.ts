import type { Actions } from './$types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../hooks.server'
import type { user } from '../../user';
import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

// Delete cookies
export const load: PageServerLoad = async ({cookies}) => {
    cookies.delete('user');
}

// Function to deal with sign up
export const actions = {
  default: async ({cookies, request}) => {

    // Get form data
    const data = await request.formData();

    // Extract email and password from form data
    let email: string = data.get('email') as string;
    let password: string = data.get('password') as string;

    // Get auth
    const auth = getAuth(app);

    // Try to create user
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        
        let user: user = {
          email: email ?? "",
          uid: res.user.uid,
          username: res.user.displayName ?? email.substring(0, email.indexOf('@'))
        }

        cookies.set('user', JSON.stringify(user));

        // Create user document
        const db = getFirestore(app);
        await setDoc(doc(db, "users", res.user.uid), {});
    } catch(err) {
        console.log("error:", err);
        return {"success": false}
    }
    
    // Redirect user to dashboard if successful sign up
    throw redirect(302, '/dashboard');
  }
} satisfies Actions;


