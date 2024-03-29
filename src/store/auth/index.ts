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
import { metaState } from '@store/meta'
import { metaRequestFailure, metaRequestPending, metaRequestSuccess } from '@tools/helper'

const initialState: AuthData = {
  ...metaState,
  user: null,
}

const setUserInfo = (state: AuthData, action: PayloadAction<UserInfo | null>) => {
  metaRequestSuccess(state)
  state.user = action.payload
}

const slice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unauthorizedTokenAction.fulfilled, setUserInfo)
    builder.addCase(getRedirectResultAction.fulfilled, setUserInfo)
    builder.addCase(signoutAuthUserAction.fulfilled, setUserInfo)
    builder
      .addCase(verifyUserTokenAction.pending, metaRequestPending)
      .addCase(verifyUserTokenAction.rejected, metaRequestFailure)
      .addCase(verifyUserTokenAction.fulfilled, setUserInfo)
  },
})

export const { reducer: authReducer } = slice
