import type { User } from 'firebase/auth'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import {
  getRedirectResultAction,
  signoutUserAction,
  verifyUserTokenAction,
} from 'store/auth/action'

interface AuthData {
  user: User | null
}

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
    builder.addCase(verifyUserTokenAction.fulfilled, successAction)
    builder.addCase(getRedirectResultAction.fulfilled, successAction)
    builder.addCase(signoutUserAction.fulfilled, successAction)
  },
})

export const { reducer: authReducer } = slice
