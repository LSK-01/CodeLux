import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

// Function to load data
export const load: PageServerLoad = async ({cookies, url}) => {
  // Get value of user cookie
  const cookie = cookies.get('user');
  // If user cookie is undefined, redirect user to login page
  if (cookie == undefined) {
      throw redirect(302, '/login');
  }
}

export const actions = {
  default: async ({request}) => {
    const data = await request.formData();
  }
} satisfies Actions;