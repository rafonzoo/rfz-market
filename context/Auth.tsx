import type { AuthProvider } from 'firebase/auth'
import type { ReactNode } from 'react'

import { useEffect, createContext, useMemo, useState } from 'react'
import { onIdTokenChanged, signInWithRedirect } from 'firebase/auth'
import { firebaseAuth } from 'core/firebase'
import { Appkey } from 'core/config'
import {
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from 'store/auth/action'
import { useRedux } from 'tools/hook'
import { useRouter } from 'next/router'
import { isProtectedPage } from 'core/helper'
import { parse } from 'cookie'

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
      return localStorage.getItem(Appkey.AL_SSID_ONLOAD)
    }

    return null
  }, [])

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
    mounted && onIdTokenChanged(firebaseAuth, async (profile) => {
      if (!isStateLoggingIn && profile) {
        dispatch(verifyUserTokenAction(profile))
      }

      if (parse(document.cookie)[Appkey.AC_SSID_CLIENT]) {
        !profile && dispatch(unauthorizedTokenAction())
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
