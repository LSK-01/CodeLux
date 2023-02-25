// @ts-nocheck
import type { PageServerLoad } from "../login/$types";

export const load = async ({cookies, params}: Parameters<PageServerLoad>[0]) => {
    //youll want to query the database here for projects using the users id
    const uid = cookies.get('uid');

    return {
        email: cookies.get('email')
    }
};