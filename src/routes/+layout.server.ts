/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies} : {cookies:any}) {
    return {
        post: {
            email: cookies.get('email'),
        },
    };
}