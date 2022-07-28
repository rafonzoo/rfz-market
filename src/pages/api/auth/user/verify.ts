import type { VerifyUser } from '@store/auth/types'

import { firebaseAdmin } from '@firebase/admin'
import { withRequest } from '@server/request'
import { cookies } from '@tools/helper'

const userVerifyRequest = withRequest<VerifyUser>(
  async ({ request, response, throwError }) => {
    const admin = firebaseAdmin()
    const token = request.body.token

    try {
      const user = await admin.auth().verifyIdToken(token)
      const opt = (httpOnly: boolean) => ({
        opt: {
          httpOnly,
          maxAge: 60 * 5,
        },
      })

      response.setHeader('Set-Cookie', [
        cookies.set('AC_SSID_SECURE', token, opt(true)),
        cookies.set('AC_SSID_CLIENT', user.uid, opt(false)),
      ])

      return { isVerified: true }
    } catch (error) {
      throwError('Forbidden')
    }
  },
  ['POST']
)

export default userVerifyRequest
