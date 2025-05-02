import { useFirebase } from '~/composables/useFirebase'

export default defineNuxtPlugin(() => {
  // Initialize Firebase
  const firebase = useFirebase()

  // Only use one method to provide Firebase to the app
  return {
    provide: {
      firebase
    }
  }
})
