import type { Actions } from "./$types";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../hooks.server";
import type { user } from "../../user";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const actions = {
  login: async ({ cookies, request }) => {
    const auth = getAuth(app);

    const data = await request.formData();
    let email: string = data.get("email") as string;
    let password: string = data.get("password") as string;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      let user: user = {
        email: email ?? "",
        uid: res.user.uid,
        username:
          res.user.displayName ?? email.substring(0, email.indexOf("@")),
      };

      cookies.set("user", JSON.stringify(user));

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },
} satisfies Actions;
