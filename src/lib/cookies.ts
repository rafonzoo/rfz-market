import type { Appkey } from '@config'
import type { CookieParseOptions, CookieSerializeOptions } from 'cookie'

import { parse, serialize } from 'cookie'

interface AppCookieGetProps {
  client?: boolean
  opt?: CookieParseOptions
}

interface AppCookieSetProps {
  client?: boolean
  opt?: CookieSerializeOptions
}

export default class AppCookies {
  get = (key: keyof typeof Appkey, props: AppCookieGetProps) => {
    return props.client ? parse(document.cookie, props.opt)[key] : parse(key, props.opt)
  }

  set = (key: keyof typeof Appkey, value: string, props: AppCookieSetProps = {}) => {
    const cookie = serialize(key, value, { path: '/', ...props.opt })
    const windowExist = typeof window !== 'undefined'

    props.client && windowExist && void (document.cookie = cookie)
    return cookie
  }

  unset = (key: keyof typeof Appkey, props: AppCookieSetProps = {}) => {
    const cookie = serialize(key, '', { path: '/', maxAge: 0, ...props.opt })
    const windowExist = typeof window !== 'undefined'

    props.client && windowExist && void (document.cookie = cookie)
    return cookie
  }
}
