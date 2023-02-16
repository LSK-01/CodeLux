import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
        console.log('default')
    }
} satisfies Actions;
