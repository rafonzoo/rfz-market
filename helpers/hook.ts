import type { Dispatcher, RootStates, SelectorDispatch } from 'store'

import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { AuthContext } from 'context/Auth'

export const useRedux: SelectorDispatch = (selectorFn) => [
  selectorFn(useSelector((state: RootStates) => state)),
  useDispatch<Dispatcher>(),
]

export const useMounted = (callbackFn: () => void) => {
  const { mounted } = useContext(AuthContext)
  useEffect(() => void (mounted && callbackFn()), [callbackFn, mounted])
}
