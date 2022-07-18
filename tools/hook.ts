import type { Dispatcher, RootStates, SelectorDispatch } from 'store'

import { useDispatch, useSelector } from 'react-redux'

export const useRedux: SelectorDispatch = (selectorFn) => [
  selectorFn(useSelector((state: RootStates) => state)),
  useDispatch<Dispatcher>(),
]
