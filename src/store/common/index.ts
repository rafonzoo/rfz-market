import type { CommonState } from '@store/common/types'

import { createSlice } from '@reduxjs/toolkit'
import { metaState } from '@store/meta'

const initialState: CommonState = {
  ...metaState,
  locale: 'id',
}

const slice = createSlice({
  initialState: initialState,
  name: 'common',
  reducers: {
    toggleLocale: (state) => {
      console.log(state.locale)
      state.locale = state.locale === 'id' ? 'en' : 'id'
    },
  },
})

export const { toggleLocale } = slice.actions
export const { reducer: commonReducer } = slice
