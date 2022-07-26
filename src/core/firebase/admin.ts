import * as admin from 'firebase-admin'

export const firebaseAdmin = () => {
  let currentApp: admin.app.App

  try {
    currentApp = admin.app()
  } catch {
    currentApp = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
    })
  }

  return currentApp
}
