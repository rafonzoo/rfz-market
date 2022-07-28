import { withRequest } from '@server/request'
import { cookies } from '@tools/helper'

const userLogoutRequest = withRequest(
  async ({ response }) => {
    response.setHeader('Set-Cookie', [
      cookies.unset('AC_SSID_SECURE'),
      cookies.unset('AC_SSID_CLIENT'),
    ])
  },
  ['POST']
)
export default userLogoutRequest
