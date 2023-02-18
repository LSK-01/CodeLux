import type { PageServerLoad } from "../login/$types";

export const load: PageServerLoad = async ({cookies, params}) => {
    //youll want to query the database here for projects using the users id
    const uid = cookies.get('uid');

    return {
        email: cookies.get('email')
    }
};