import type { NextRequest } from 'types'

import { firebaseAdmin } from 'core/firebase/admin'
import { Appkey, AppRoutes } from 'core/config'
import { serialize } from 'cookie'

export interface VerifyResponse {
  isVerified: boolean
}

const requestPostVerify: NextRequest<VerifyResponse> = async (req, res) => {
  const admin = firebaseAdmin()
  const { token } = req.body

  let response = res.status(404)
  let isVerified = false

  if (req.method !== 'POST') {
    return response.json({ isVerified })
  }

  try {
    await admin.auth().verifyIdToken(token)

    res.setHeader(
      'Set-Cookie',
      serialize(Appkey.tokenCookie, token, {
        path: AppRoutes.beranda,
        httpOnly: true,
        maxAge: 60 * 5,
      })
    )

    response = res.status(200)
    isVerified = true
  } catch (e) {
    response = res.status(404)
  }

  return response.json({ isVerified })
}

export default requestPostVerify
