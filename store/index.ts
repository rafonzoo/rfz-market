import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from 'store/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
})

export type RootStates = ReturnType<typeof store.getState>
export type Dispatcher = typeof store.dispatch
export type SelectorDispatch = <T>(fn: (s: RootStates) => T) => [T, Dispatcher]
