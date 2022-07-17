import type { Auth, User } from 'firebase/auth'
import type { VerifyUser } from 'store/auth/types'

import { getRedirectResult } from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Appkey, AppRoutesApi } from 'core/config'
import { firebaseAuth } from 'core/firebase'
import { dofetch, devlog } from 'core/helper'

export const unauthorizedTokenAction = createAsyncThunk(
  'auth/unauthorizedTokenAction',
  async () => {
    try {
      await dofetch({
        url: AppRoutesApi.userLogout,
        method: 'POST',
      })

      setTimeout(() => location.reload(), 5000)
    } catch (error) {
      devlog(error, 'error')
    }
    return null
  }
)

export const verifyUserTokenAction = createAsyncThunk(
  'auth/verifyUserTokenAction',
  async (user: User) => {
    try {
      const { data } = await dofetch<VerifyUser>({
        url: AppRoutesApi.userVerify,
        method: 'POST',
        data: {
          token: await user.getIdToken(),
        },
      })

      return data.isVerified ? user : null
    } catch (error) {
      devlog(error, 'error')
    }
    return null
  }
)

export const getRedirectResultAction = createAsyncThunk(
  'auth/getRedirectResultAction',
  async (auth: Auth) => {
    let account = null
    try {
      const credential = await getRedirectResult(auth)
      const user = credential?.user

      if (user) {
        const { data } = await dofetch<VerifyUser>({
          url: AppRoutesApi.userVerify,
          method: 'POST',
          data: {
            token: await user.getIdToken(),
          },
        })

        account = data.isVerified ? user : null
      }
    } catch (error) {
      devlog(error, 'error')
    }

    localStorage.removeItem(Appkey.AL_SSID_ONLOAD)
    location.reload()

    return account
  }
)

export const signoutAuthUserAction = createAsyncThunk(
  'auth/signoutUserAction',
  async () => {
    try {
      await firebaseAuth.signOut()
      await dofetch({
        url: AppRoutesApi.userLogout,
        method: 'POST',
      })

      location.reload()
    } catch (error) {
      devlog(error, 'error')
    }

    return null
  }
)
