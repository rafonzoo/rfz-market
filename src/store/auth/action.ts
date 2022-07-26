import type { VerifyUser } from '@store/auth/types'
import type { UserInfo } from 'firebase-admin/lib/auth/user-record'
import type { Auth, User } from 'firebase/auth'

import { auth } from '@core/app'
import { Appkey, AppRoutesApi } from '@core/config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { devlog, dofetch } from '@tools/helper'
import { getRedirectResult } from 'firebase/auth'

const setUserInfo = (user: User) => {
  return {
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    providerId: user.providerId,
    uid: user.uid,
  } as UserInfo
}

export const unauthorizedTokenAction = createAsyncThunk(
  'auth/unauthorizedTokenAction',
  async () => {
    try {
      await dofetch({
        method: 'POST',
        url: AppRoutesApi.userLogout,
      })

      setTimeout(() => location.reload(), 500)
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
        data: {
          token: await user.getIdToken(),
        },
        method: 'POST',
        url: AppRoutesApi.userVerify,
      })

      return data.isVerified ? setUserInfo(user) : null
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
          data: {
            token: await user.getIdToken(),
          },
          method: 'POST',
          url: AppRoutesApi.userVerify,
        })

        account = data.isVerified ? setUserInfo(user) : null
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
      await auth.signOut()
      await dofetch({
        method: 'POST',
        url: AppRoutesApi.userLogout,
      })

      location.reload()
    } catch (error) {
      devlog(error, 'error')
    }

    return null
  }
)
