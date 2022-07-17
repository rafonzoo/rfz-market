import type { User } from 'firebase/auth'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthData } from 'store/auth/types'

import { createSlice } from '@reduxjs/toolkit'
import {
  getRedirectResultAction,
  signoutAuthUserAction,
  unauthorizedTokenAction,
  verifyUserTokenAction,
} from 'store/auth/action'

const initialState: AuthData = {
  user: null,
}

const successAction = (state: AuthData, action: PayloadAction<User | null>) => {
  state.user = action.payload
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unauthorizedTokenAction.fulfilled, successAction)
    builder.addCase(getRedirectResultAction.fulfilled, successAction)
    builder.addCase(verifyUserTokenAction.fulfilled, successAction)
    builder.addCase(signoutAuthUserAction.fulfilled, successAction)
  },
})

export const { reducer: authReducer } = slice
