import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

const userStore = writable<{
    loggedIn: boolean,
    user?: User
}>({
    loggedIn: false
})

export default {
    subscribe: userStore.subscribe,
    set: userStore.set
}