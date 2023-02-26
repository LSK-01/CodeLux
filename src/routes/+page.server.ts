import type { PageServerLoad } from "./login/$types";

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete('user');
}