import type { AuthProvider } from 'firebase/auth'
import type { ReactNode } from 'react'

import { ColorModeProvider } from '@context/Theme'
import { router } from '@core'
import { Appkey } from '@core/config'
import { firebaseAuth } from '@core/firebase/client'
import { GlobalStyles } from '@mui/material'
import {
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from '@store/auth/action'
import { isProtectedPage } from '@tools/helper'
import { useRedux } from '@tools/hook'
import { typography } from '@tools/typography'
import { parse } from 'cookie'
import { onIdTokenChanged, signInWithRedirect } from 'firebase/auth'
import { useEffect, createContext, useState } from 'react'

export const AuthContext = createContext<{
  logout: () => void
  signInWithProvider: (provider: AuthProvider) => void
}>(undefined!)

export const AuthContextProvider = ({ children }: { children?: ReactNode }) => {
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
    <AuthContext.Provider value={{ signInWithProvider, logout }}>
      <ColorModeProvider>
        <GlobalStyles
          styles={(theme) => ({
            html: {
              direction: 'ltr',
              textAlign: 'left',
              fontSynthesis: 'none',
              fontFeatureSettings: '"kern"',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            },
            body: {
              ...typography.body,
              fontWeight: 400,
              fontFamily: theme.typography.fontFamily,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              padding: '0',
              margin: '0',
            },
          })}
        />
        {children}
      </ColorModeProvider>
    </AuthContext.Provider>
  )
}
