import type { PageServerLoad } from "./login/$types";

// Delete user cookie on load
export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('user');
}