import type { Actions } from "./$types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../hooks.server";
import type { user } from "../../user";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('user');
}

export const actions = {
  default: async ({ cookies, request }) => {
    const auth = getAuth(app);

    const data = await request.formData();
    let email: string = data.get("email") as string;
    let password: string = data.get("password") as string;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        const db = getFirestore(app);
        const userDocRef = doc(db, "users", res.user.uid);
        const userDoc = await getDoc(userDocRef);

        let githubToken: string = "";
        //they have a github API token - add to the cookie
        if (userDoc.exists()) {
          githubToken = userDoc.data().githubToken;
        }

        let user: user = {
          email: email ?? "",
          uid: res.user.uid,
          username:
            res.user.displayName ?? email.substring(0, email.indexOf("@")),
          githubToken: githubToken,
        };

        cookies.set("user", JSON.stringify(user));
    } catch (err) {
        return { success: false };
    }
    throw redirect(302, '/dashboard');
  },
} satisfies Actions;
