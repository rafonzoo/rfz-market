import type { VerifyUser } from 'store/auth/types'

import { withRequest } from 'core/server/request'
import { firebaseAdmin } from 'core/firebase/admin'
import { Appkey, AppRoutes } from 'core/config'
import { serialize } from 'cookie'

const userVerifyRequest = withRequest<VerifyUser>(
  async ({ request, response, throwError }) => {
    const admin = firebaseAdmin()
    const token = request.body.token

    try {
      await admin.auth().verifyIdToken(token)

      response.setHeader('Set-Cookie', [
        serialize(Appkey.AC_SSID_SECURE, token, {
          path: AppRoutes.beranda,
          httpOnly: true,
          maxAge: 60 * 5,
        }),
        serialize(Appkey.AC_SSID_CLIENT, token, {
          path: AppRoutes.beranda,
          maxAge: 60 * 5,
        }),
      ])

      return { isVerified: true }
    } catch (error) {
      throwError('Forbidden')
    }
  },
  ['POST']
)

export default userVerifyRequest
