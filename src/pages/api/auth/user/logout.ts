import { serialize } from '@core/app'
import { Appkey, AppRoutes } from '@core/config'
import { withRequest } from '@core/server'

const userLogoutRequest = withRequest(
  async ({ response }) => {
    const path = AppRoutes.beranda
    const option = { maxAge: 0, path }

    response.setHeader('Set-Cookie', [
      serialize(Appkey.AC_SSID_SECURE, '', option),
      serialize(Appkey.AC_SSID_CLIENT, '', option),
    ])
  },
  ['POST']
)
export default userLogoutRequest
