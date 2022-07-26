import type { FetchRequest } from '@type'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import { axios } from '@core/app'
import { AppRoutes } from '@core/config'

export const devlog = (message: unknown, key?: keyof typeof colorType) => {
  if (typeof window === 'undefined') {
    throw new Error('`setDevConsole` is called ouside the window.')
  }

  const colorType = {
    error: '#dc2626',
    log: '#2563eb',
    success: '#15803d',
    warn: '#ca8a04',
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
