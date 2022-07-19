import type { FirebaseApp } from 'firebase/app'

import { getApp, initializeApp } from 'firebase/app'
import { getAuth, indexedDBLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = () => {
  let APP: FirebaseApp

  try {
    APP = getApp()
  } catch {
    APP = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

  return APP
}

export const firebase = firebaseApp()

export const firebaseAuth = getAuth(firebase)

export const firestore = getFirestore(firebase)

firebaseAuth.setPersistence(indexedDBLocalPersistence)
