import type { Dispatcher, RootStates, SelectorDispatch } from '@config/store'

import { AuthContext, ColorModeContext } from '@context'
import { default as EnLang } from 'locale/en.json'
import { default as IDLang } from 'locale/id.json'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useRedux: SelectorDispatch = (selectorFn) => [
  selectorFn(useSelector((state: RootStates) => state)),
  useDispatch<Dispatcher>(),
]

export const useCommon = () => {
  const [locale] = useRedux((state) => state.common.locale)
  const reversed = locale === 'id' ? 'en' : 'id'
  const translation = {
    id: IDLang,
    en: EnLang,
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return {
    t: (str: string): string =>
      str.split('.').reduce((o, i) => o[i], translation[locale] as any) ||
      str.split('.').reduce((o, i) => o[i], translation[reversed] as any) ||
      str,
  }
}

export const useMounted = (callback: () => void) => {
  const [mounted, isMounted] = useState(false)

  useEffect(() => isMounted(true), [])
  useEffect(() => void (mounted && callback()), [mounted, callback])
}

export const useThemeContext = () => useContext(ColorModeContext)
export const useAuthContext = () => useContext(AuthContext)
