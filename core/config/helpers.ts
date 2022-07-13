import type { CookieSerializeOptions } from 'cookie'

import { Appkey } from 'core/config'
import { serialize } from 'cookie'

export const setDocumentCookie = (
  name: keyof typeof Appkey,
  value: string,
  opt?: CookieSerializeOptions
) => {
  document.cookie = serialize(Appkey[name], value, { path: '/', ...opt })
}

export const removeDocumentCookie = (name: keyof typeof Appkey, opt?: CookieSerializeOptions) => {
  document.cookie = serialize(Appkey[name], '', { ...opt, maxAge: 0 })
}
