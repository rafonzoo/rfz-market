import type { VerifyUser } from '@store/auth/types'

import { serialize } from '@core/app'
import { Appkey, AppRoutes } from '@core/config'
import { firebaseAdmin } from '@core/firebase/admin'
import { withRequest } from '@core/server'

const userVerifyRequest = withRequest<VerifyUser>(
  async ({ request, response, throwError }) => {
    const admin = firebaseAdmin()
    const token = request.body.token

    try {
      const user = await admin.auth().verifyIdToken(token)

      response.setHeader('Set-Cookie', [
        serialize(Appkey.AC_SSID_SECURE, token, {
          httpOnly: true,
          maxAge: 60 * 5,
          path: AppRoutes.beranda,
        }),
        serialize(Appkey.AC_SSID_CLIENT, user.uid, {
          maxAge: 60 * 5,
          path: AppRoutes.beranda,
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
