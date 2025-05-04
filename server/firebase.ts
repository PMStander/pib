import { initializeServerApp, type FirebaseApp } from "firebase/app"
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"
import {
    browserSessionPersistence,
    connectAuthEmulator,
    getAuth,
    setPersistence,
    onAuthStateChanged,
    type Auth
} from "firebase/auth"
import { connectFirestoreEmulator, getFirestore, type Firestore, doc, setDoc } from "firebase/firestore"
import process from 'process'
import { getFirebaseConfig } from "./utils/firebase"

let firebaseApp: FirebaseApp | null = null
let firestoreInstance: Firestore | null = null
let authInstance: Auth | null = null
let isEmulatorConnected = false

export const useFirebaseServer = async (authIdToken: string | undefined) => {
    const isDevelopment = process.env.NODE_ENV === "development"
    const firebaseConfig: any = getFirebaseConfig()
    // console.log("firebaseConfig: ", firebaseConfig)
    console.log("authIdToken: ", authIdToken)
    console.log("isDevelopment: ", isDevelopment)
    // console.log("___>___>", config.firebaseAdmin)
    try {
        // Initialize Firebase app only if not already initialized
        if (!firebaseApp) {
            firebaseApp = initializeServerApp(firebaseConfig, {
                authIdToken: authIdToken ?? undefined,
            })
        }

        // Get or create Auth instance
        if (!authInstance) {
            authInstance = getAuth(firebaseApp)
        }

        // Get or create Firestore instance
        if (!firestoreInstance) {
            firestoreInstance = getFirestore(firebaseApp)
        }

        // Connect to emulators only once in development
        if (isDevelopment && !isEmulatorConnected) {
            console.log('******----------********')
            try {
                connectFirestoreEmulator(firestoreInstance, "localhost", 8080)

                const authUrl = "http://127.0.0.1:9099"
                connectAuthEmulator(authInstance, authUrl, { disableWarnings: true })

                setPersistence(authInstance, browserSessionPersistence).catch((err) => {
                    console.error("[Firebase] Error enabling persistence:", err)
                })

                isEmulatorConnected = true
                console.log('[Firebase] Emulator connection successful.');


            } catch (error) {
                console.error("[Firebase] Error setting up emulators:", error)
                // Continue without emulators in case of error
            }



        }
        console.log('isEmulatorConnected: ', isEmulatorConnected)

        // Initialize VertexAI for each request as it might need the current auth token
        const vertexAI = getVertexAI(firebaseApp)
        const model = getGenerativeModel(vertexAI, {
            model: "gemini-1.5-flash-preview-0514",
        })

        console.log('[Firebase] useFirebaseServer returning:', {
            firestoreInstanceExists: !!firestoreInstance,
            isEmulatorConnected: isEmulatorConnected
        });

        return {
            firebaseApp,
            firestore: firestoreInstance,
            auth: authInstance,
            vertexAI,
            model,
            storage: null,
            onAuthStateChanged,
            messaging: null,
        }

    } catch (error) {
        console.error("[Firebase] Error in useFirebaseServer:", error);
        throw error
    }
}
