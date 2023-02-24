import { writable } from 'svelte/store'

export const FeedbackStore = writable([
  {
    id: 1,
    question : '',
    rating: 1,
    text: '',
  }
])
