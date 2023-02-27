import { writable } from 'svelte/store'

export const FeedbackStore = writable([
  {
    question : '',
    rating: 1,
    text: '',
  }
])
