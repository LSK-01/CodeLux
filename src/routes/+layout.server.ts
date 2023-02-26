import type { PageServerLoad } from "./login/$types";

export const load: PageServerLoad = async ({cookies, params}) => {
    const cookie = cookies.get('user')!;
    if (cookie == null) {
        return {
            user: {},
        }
    }
    const user = JSON.parse(cookie);
    return {
        user: user,
    };
}