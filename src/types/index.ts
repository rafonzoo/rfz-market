import type { ComponentPropsWithoutRef, ElementType, ForwardedRef } from 'react'

export type ForwardedRefProps<U extends ElementType, T = {}> = T &
  Omit<ComponentPropsWithoutRef<U>, 'color'>

export type SFR<T extends ElementType, D, P = {}> = (
  props: ForwardedRefProps<T, P>,
  ref: ForwardedRef<D>
) => JSX.Element
