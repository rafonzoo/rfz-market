import { Appkey, AppRoutes } from 'core/config'
import { serialize } from 'cookie'
import { withRequest } from 'core/server/request'

const userLogoutRequest = withRequest(
  async ({ response }) => {
    const path = AppRoutes.beranda
    const option = { path, maxAge: 0 }

    response.setHeader('Set-Cookie', [
      serialize(Appkey.AC_SSID_SECURE, '', option),
      serialize(Appkey.AC_SSID_CLIENT, '', option),
    ])
  },
  ['POST']
)
export default userLogoutRequest
