import type { FirebaseApp } from 'firebase/app'

import { getApp, initializeApp } from 'firebase/app'
import { getAuth, indexedDBLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseApp = () => {
  let APP: FirebaseApp

  try {
    APP = getApp()
  } catch {
    APP = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  }

  return APP
}

const firebase = firebaseApp()

const auth = getAuth(firebase)

const db = getFirestore(firebase)

auth.setPersistence(indexedDBLocalPersistence)

export { auth, db }
