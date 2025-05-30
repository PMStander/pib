import { initializeApp } from "firebase/app"
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { connectStorageEmulator, getStorage } from "firebase/storage"
import { getMessaging } from "firebase/messaging"

export const useFirebase = () => {
  const config = useRuntimeConfig()
  const isDev = process.env.NODE_ENV === "development"
  const firebaseConfig = config.public.firebaseConfig

  console.log("Firebase config:", firebaseConfig)

  // In development, clear any existing credentials
  if (isDev && typeof window !== 'undefined') {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = ''
  }

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  // Initialize storage, messaging, and dataConnect
  let storage = null
  let messaging = null
  let vertexAI = null
  let model = null

  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Initialize storage
    storage = getStorage(firebaseApp)

    // Initialize messaging if supported
    try {
      messaging = getMessaging(firebaseApp)
    } catch (error) {
      console.warn("Firebase messaging not supported:", error)
    }

    // Connect to emulators in development
    if (isDev) {
      // Connect to Storage emulator
      if (storage) {
        try {
          connectStorageEmulator(storage, "localhost", 9199)
        } catch (error) {
          console.warn("Error connecting to Storage Emulator:", error)
        }
      }
    }
  }

  // Connect to Firestore emulator in development
  if (isDev) {
    const host =
      (firestore.toJSON() as { settings?: { host?: string } }).settings?.host ??
      ""

    if (!host.startsWith("localhost")) {
      try {
        connectFirestoreEmulator(firestore, "localhost", 8080)
      } catch (error) {
        console.warn("Error connecting to Firestore Emulator:", error)
      }
    }

    // Connect to Auth emulator
    try {
      // Always use localhost for consistency
      connectAuthEmulator(auth, "http://localhost:9199", { disableWarnings: true })
      console.log("Connected to Auth Emulator")
    } catch (error) {
      console.error("Error connecting to Auth Emulator:", error)
      // Log more detailed error information
      if (error instanceof Error) {
        console.error("Auth Emulator Error Details:", error.message, error.stack)
      }
    }
  }

  // Set persistence for auth
  if (typeof window !== 'undefined') {
    setPersistence(auth, browserSessionPersistence).catch((err) => {
      console.error("Error enabling persistence:", err)
    })
  }

  return {
    firebaseApp,
    firestore,
    auth,
    storage,
    messaging,
    vertexAI,
    model,
    onAuthStateChanged,
  }
}
