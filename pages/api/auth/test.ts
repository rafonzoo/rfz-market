import { AppRequestStatus } from 'core/config'
import { withRequest } from 'core/server/request'

const testRequest = withRequest<{ ok: boolean }>(
  async (request, response) => {
    try {
      return { ok: true }
    } catch (error) {
      throw AppRequestStatus.HTTPVersionNotSupported
    }
  },
  ['GET']
)

export default testRequest
