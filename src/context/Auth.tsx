import type { AuthProvider } from 'firebase/auth'
import type { ReactNode } from 'react'

import { ColorModeProvider } from '@context'
import { auth } from '@firebase/client'
import {
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from '@store/auth/action'
import { cookies, isProtectedPage, storage } from '@tools/helper'
import { useRedux } from '@tools/hook'
import { onIdTokenChanged, signInWithRedirect } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<{
  logout: () => void
  signInWithProvider: (provider: AuthProvider) => void
}>(undefined!)

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
  const [{ user }, dispatch] = useRedux((state) => state.auth)
  const [mounted, isMounted] = useState(false)

  const router = useRouter()
  const signInWithProvider = async (provider: AuthProvider) => {
    storage.set('AL_SSID_ONLOAD', true + '')
    await signInWithRedirect(auth, provider)
  }

  const logout = () => {
    dispatch(signoutAuthUserAction())
  }

  useEffect(() => isMounted(true), [])
  useEffect(() => {
    // prettier-ignore
    mounted && onIdTokenChanged(auth, async (user) => {
      const isStateLoggingIn = storage.get('AL_SSID_ONLOAD')
      const clientUserCookie = cookies.get('AC_SSID_CLIENT', { client: true })

      if (clientUserCookie && !isStateLoggingIn) {
        user
          ? dispatch(verifyUserTokenAction(user))
          : dispatch(unauthorizedTokenAction())
      }
    })
  }, [dispatch, mounted])

  useEffect(() => {
    if (user && isProtectedPage(router.asPath)) {
      !storage.get('AL_SSID_ONLOAD') && router.replace('/')
    }
  }, [router, user])

  return (
    <AuthContext.Provider value={{ logout, signInWithProvider }}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </AuthContext.Provider>
  )
}

export default AuthContext
