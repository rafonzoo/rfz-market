import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { FetchRequest } from 'types'

import { AppRoutes } from 'core/config'
import { axios } from 'core/import'

export const devlog = (message: unknown, key?: keyof typeof colorType) => {
  if (typeof window === 'undefined') {
    throw new Error('`setDevConsole` is called ouside the window.')
  }

  const colorType = {
    log: '#2563eb',
    error: '#dc2626',
    warn: '#ca8a04',
    success: '#15803d',
  }

  const style = `
    background-color: ${colorType[key || 'log']};
    font-size: 11px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 4px;
  `

  const isClientDev = location.href.includes('localhost')
  return isClientDev && console.log('%cDEV', style, message)
}

export const dofetch = async <P extends FetchRequest>(
  option: AxiosRequestConfig<P['payload']>
) => {
  const defaultConfig = {
    ...option,
    method: option.method ?? 'GET',
  }
  return (await axios(defaultConfig)) as AxiosResponse<P['response']>
}

export const isProtectedPage = (string: string) => {
  const protectedRoutes = [AppRoutes.masuk, AppRoutes.daftar]
  return protectedRoutes.includes(string as AppRoutes)
}
