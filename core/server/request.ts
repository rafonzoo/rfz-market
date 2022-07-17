import type { NextApiRequest, NextApiResponse } from 'next'
import type { FetchRequest } from 'types'

import { AppRequestStatus } from 'core/config'

type CallbackFn<P = {}> = (args: CallbackProps) => Promise<P | void | undefined> | never

type CallbackProps = {
  request: NextApiRequest
  response: NextApiResponse
  throwError: (key: keyof typeof AppRequestStatus) => never
}

// prettier-ignore
// eslint-disable-next-line max-len
export const withRequest = <T extends FetchRequest>(cb: CallbackFn<T['response']>, methods: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse<T['response'] | undefined>) => {
    const { InternalServerError, MethodNotAllowed, OK } = AppRequestStatus

    const throwError: CallbackProps['throwError'] = (key) => {
      throw AppRequestStatus[key]
    }

    if (!req.method || methods.length === 0) {
      return res.status(InternalServerError).json(undefined)
    }

    const toLowerMethod = methods
      .map((method) => method.toLowerCase())
      .includes(req.method.toLowerCase())

    if (!toLowerMethod) {
      return res.status(MethodNotAllowed).json(undefined)
    }

    try {
      const data = await cb({ request: req, response: res, throwError })
      return res.status(OK).json(data instanceof Object ? data : undefined)
    } catch (e) {
      return res.status(e as AppRequestStatus).json(undefined)
    }
  }
}
