import type { Actions } from './$types';
 
export const actions = {
  default: async ({request}) => {
    const data = await request.formData();
    console.log("data ", data)
  }
} satisfies Actions;