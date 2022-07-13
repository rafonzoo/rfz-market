import type { AuthProvider, User } from 'firebase/auth'
import type { ReactNode } from 'react'

import { firebaseAuth } from 'core/firebase'
import { onAuthStateChanged, onIdTokenChanged, signInWithRedirect } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { Appkey, isProtected } from 'core/config'
import { removeDocumentCookie, setDocumentCookie } from 'core/config/helpers'

import { useRouter } from 'next/router'

export const AuthContext = createContext<{
  logout: () => void
  signInWithProvider: (provider: AuthProvider) => void
}>(undefined!)

export const ProviderAuth = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const signInWithProvider = async (provider: AuthProvider) => {
    // TODO: Move to redux thunk
    localStorage.setItem(Appkey.tokenStates, 'true')
    await signInWithRedirect(firebaseAuth, provider)
  }

  const logout = () => {
    // TODO: Move to redux thunk
    firebaseAuth.signOut()

    setUser(null)
    removeDocumentCookie('tokenCookie')

    location.reload()
  }

  useEffect(() => {
    onIdTokenChanged(firebaseAuth, async (profile) => {
      if (profile) {
        // TODO: Move to redux thunk
        const token = await profile.getIdToken()

        setUser(profile)
        setDocumentCookie('tokenCookie', token)

        return
      }

      // TODO: Move to redux thunk
      setUser(null)
      removeDocumentCookie('tokenCookie')
    })
  }, [])

  useEffect(() => {
    const isStateLoggingIn = localStorage.getItem(Appkey.tokenStates)

    onAuthStateChanged(firebaseAuth, () => {
      if (isStateLoggingIn) {
        localStorage.removeItem(Appkey.tokenStates)
        location.reload()
      }
    })

    if (isProtected(router.asPath)) {
      user && !isStateLoggingIn && router.replace('/')
    }
  }, [router, user])

  return (
    <AuthContext.Provider value={{ signInWithProvider, logout }}>{children}</AuthContext.Provider>
  )
}
