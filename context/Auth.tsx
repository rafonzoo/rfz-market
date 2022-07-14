import type { AuthProvider } from 'firebase/auth'
import type { ReactNode } from 'react'

import { useMemo } from 'react'
import { onIdTokenChanged } from 'firebase/auth'
import { useState } from 'react'
import { firebaseAuth } from 'core/client/app'
import { signInWithRedirect } from 'firebase/auth'
import { createContext, useEffect } from 'react'
import { Appkey } from 'core/client'
import { signoutUserAction, verifyUserTokenAction } from 'store/auth/action'
import { useRedux } from 'helpers/hook'
import { useRouter } from 'next/router'
import { isProtectedPage } from 'helpers/common'

export const AuthContext = createContext<{
  mounted: boolean
  logout: () => void
  signInWithProvider: (provider: AuthProvider) => void
}>(undefined!)

export const ProviderAuth = ({ children }: { children?: ReactNode }) => {
  const [{ user }, dispatch] = useRedux((state) => state.auth)
  const [mounted, isMounted] = useState(false)

  const router = useRouter()
  const isStateLoggingIn = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(Appkey.tokenStates)
    }

    return null
  }, [])

  const signInWithProvider = async (provider: AuthProvider) => {
    localStorage.setItem(Appkey.tokenStates, 'true')
    await signInWithRedirect(firebaseAuth, provider)
  }

  const logout = () => {
    dispatch(signoutUserAction())
  }

  useEffect(() => isMounted(true), [])
  useEffect(() => {
    onIdTokenChanged(firebaseAuth, async (profile) => {
      if (!isStateLoggingIn) {
        mounted && dispatch(verifyUserTokenAction(profile))
      }
    })
  }, [dispatch, isStateLoggingIn, mounted])

  useEffect(() => {
    if (user && isProtectedPage(router.asPath)) {
      !isStateLoggingIn && router.replace('/')
    }
  }, [isStateLoggingIn, router, user])

  return (
    <AuthContext.Provider value={{ mounted, signInWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
