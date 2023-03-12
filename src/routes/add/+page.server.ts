import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({cookies, url}) => {
  const cookie = cookies.get('user');
  if (cookie == undefined) {
      throw redirect(302, '/login');
  }
}
 
export const actions = {
  default: async ({request}) => {
    const data = await request.formData();
  }
} satisfies Actions;