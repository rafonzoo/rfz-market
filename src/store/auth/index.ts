import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthData } from '@store/auth/types'
import type { UserInfo } from 'firebase-admin/lib/auth/user-record'

import { createSlice } from '@reduxjs/toolkit'
import {
  getRedirectResultAction,
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from '@store/auth/action'

const initialState: AuthData = {
  user: null,
}

const setUserInfo = (state: AuthData, action: PayloadAction<UserInfo | null>) => {
  state.user = action.payload
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unauthorizedTokenAction.fulfilled, setUserInfo)
    builder.addCase(getRedirectResultAction.fulfilled, setUserInfo)
    builder.addCase(verifyUserTokenAction.fulfilled, setUserInfo)
    builder.addCase(signoutAuthUserAction.fulfilled, setUserInfo)
  },
})

export const { reducer: authReducer } = slice
