import type { Auth, User } from 'firebase/auth'
import type { VerifyResponse } from 'pages/api/auth/verify'

import { getRedirectResult } from 'firebase/auth'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Appkey, AppRequest } from 'core/client'
import { axios } from 'core/lib'
import { firebaseAuth } from 'core/client/app'

export const verifyUserTokenAction = createAsyncThunk(
  'auth/verifyUserTokenAction',
  async (user: User | null) => {
    if (user) {
      const { postVerifyUser: verifyUser } = AppRequest
      const { data } = await axios.post<VerifyResponse>(verifyUser, {
        token: await user.getIdToken(),
      })

      return data.isVerified ? user : null
    }

    return user
  }
)

export const getRedirectResultAction = createAsyncThunk(
  'auth/getRedirectResultAction',
  async (auth: Auth) => {
    const credential = await getRedirectResult(auth)

    if (credential && credential.user) {
      const { postVerifyUser: verifyUser } = AppRequest
      const token = await credential.user.getIdToken()

      await axios.post<VerifyResponse>(verifyUser, { token })
    }

    localStorage.removeItem(Appkey.tokenStates)
    location.reload()

    return credential?.user || null
  }
)

export const signoutUserAction = createAsyncThunk('auth/signoutUserAction', async () => {
  await firebaseAuth.signOut()
  await axios.post(AppRequest.postUserSignout)

  location.reload()
  return null
})
