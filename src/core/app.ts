import { default as Axios } from 'axios'
import { default as NextLink } from 'next/link'
import { default as Router } from 'next/router'

export const axios = Axios
export const Link = NextLink
export const router = Router

export * from '@core/config/store'
export * from '@core/config/theme'
export * from '@core/firebase/client'

export * from 'cookie'
