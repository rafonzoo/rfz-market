import type { NextRequest } from 'types'

import { Appkey, AppRoutes } from 'core/config'
import { serialize } from 'cookie'

const requestPostLogout: NextRequest = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Unsupported method.')
  }

  res.setHeader(
    'Set-Cookie',
    serialize(Appkey.tokenCookie, '', {
      path: AppRoutes.beranda,
      maxAge: 0,
    })
  )

  return res.status(200).send('Success!')
}

export default requestPostLogout
