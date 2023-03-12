import type { Actions } from "./$types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../hooks.server";
import type { user } from "../../user";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

// Delete cookies on page load
export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('user');
}

// Handles auth
export const actions = {
  default: async ({ cookies, request }) => {

    // Get auth
    const auth = getAuth(app);

    // Get email and password
    const data = await request.formData();
    let email: string = data.get("email") as string;
    let password: string = data.get("password") as string;

    // Try to sign user in
    try {
        // Sign user in
        const res = await signInWithEmailAndPassword(auth, email, password);

        // Get firestore instance
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", res.user.uid);
        const userDoc = await getDoc(userDocRef);

        let githubToken: string = "";
        // If they have a github API token - add to the cookie
        if (userDoc.exists()) {
          githubToken = userDoc.data().githubToken;
        }

        // Define user object
        let user: user = {
          email: email ?? "",
          uid: res.user.uid,
          username:
            res.user.displayName ?? email.substring(0, email.indexOf("@")),
          githubToken: githubToken,
        };

        //Set cookies
        cookies.set("user", JSON.stringify(user));
    } catch (err) {
        return { success: false };
    }
    // If successful, redirect user to dashboard
    throw redirect(302, '/dashboard');
  },
} satisfies Actions;
