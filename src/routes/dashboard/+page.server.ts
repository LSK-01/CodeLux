import type { PageServerLoad } from "../login/$types";
import type {user } from '../../user';

export const load: PageServerLoad = async ({cookies, params}) => {
    const user = JSON.parse(cookies.get('user')!);

    return {
        user: user
    }
};