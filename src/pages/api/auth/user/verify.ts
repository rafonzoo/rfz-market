import type { VerifyUser } from '@store/auth/types'

import { Appkey, AppRoutes } from '@core/config'
import { firebaseAdmin } from '@core/firebase/admin'
import { withRequest } from '@server/request'
import { serialize } from 'cookie'

const userVerifyRequest = withRequest<VerifyUser>(
  async ({ request, response, throwError }) => {
    const admin = firebaseAdmin()
    const token = request.body.token

    try {
      const user = await admin.auth().verifyIdToken(token)

      response.setHeader('Set-Cookie', [
        serialize(Appkey.AC_SSID_SECURE, token, {
          path: AppRoutes.beranda,
          httpOnly: true,
          maxAge: 60 * 5,
        }),
        serialize(Appkey.AC_SSID_CLIENT, user.uid, {
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
