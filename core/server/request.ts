import type { NextApiRequest, NextApiResponse } from 'next'

import { AppRequestStatus } from 'core/config'

type RequestCallback<P> = (req: NextApiRequest, res: NextApiResponse) => Promise<P>
// type WithRequestParam<C> = (
//   result: WithRequestCallback<C>,
//   method: string[]
// ) => WithRequestCallback<C>

export const withRequest = <T = {}>(callbackFn: RequestCallback<T>, method: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const { InternalServerError, MethodNotAllowed, OK } = AppRequestStatus

    if (!method.includes(req.body)) {
      return res.status(MethodNotAllowed).send(null)
    }

    try {
      const data = await callbackFn(req, res)
      const response = res.status(OK)

      return response.json(data)
    } catch (e) {
      const isThrowed = typeof e === 'number'
      const error = e as AppRequestStatus

      if (isThrowed /* Throw from the callback */) {
        return res.status(error).send(null)
      }
    }

    return res.status(InternalServerError).send(null)
  }
}
