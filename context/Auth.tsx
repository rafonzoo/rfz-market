import type { AuthProvider } from 'firebase/auth'
import type { ReactNode } from 'react'

import { parse } from 'cookie'
import { Appkey } from 'core/config'
import { firebaseAuth } from 'core/firebase'
import { isProtectedPage } from 'core/helper'
import { router } from 'core/import'
import { onIdTokenChanged, signInWithRedirect } from 'firebase/auth'
import { useEffect, createContext, useState } from 'react'
import {
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from 'store/auth/action'
import { useRedux } from 'tools/hook'

export const AuthContext = createContext<{
  mounted: boolean
  logout: () => void
  signInWithProvider: (provider: AuthProvider) => void
}>(undefined!)

export const ProviderAuth = ({ children }: { children?: ReactNode }) => {
  const [{ user }, dispatch] = useRedux((state) => state.auth)
  const [mounted, isMounted] = useState(false)

  const signInWithProvider = async (provider: AuthProvider) => {
    localStorage.setItem(Appkey.AL_SSID_ONLOAD, 'true')
    await signInWithRedirect(firebaseAuth, provider)
  }

  const logout = () => {
    dispatch(signoutAuthUserAction())
  }

  useEffect(() => isMounted(true), [])
  useEffect(() => {
    // prettier-ignore
    mounted && onIdTokenChanged(firebaseAuth, async (user) => {
      const isStateLoggingIn = localStorage.getItem(Appkey.AL_SSID_ONLOAD)
      const clientUserCookie = parse(document.cookie)[Appkey.AC_SSID_CLIENT]

      if (clientUserCookie && !isStateLoggingIn) {
        user
          ? dispatch(verifyUserTokenAction(user))
          : dispatch(unauthorizedTokenAction())
      }
    })
  }, [dispatch, mounted])

  useEffect(() => {
    const isStateLoggingIn = localStorage.getItem(Appkey.AL_SSID_ONLOAD)
    if (user && isProtectedPage(router.asPath)) {
      !isStateLoggingIn && router.replace('/')
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ mounted, signInWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
