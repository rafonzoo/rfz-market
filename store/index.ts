import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from 'store/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootStates = ReturnType<typeof store.getState>
export type Dispatcher = typeof store.dispatch
export type SelectorDispatch = <T>(fn: (s: RootStates) => T) => [T, Dispatcher]
