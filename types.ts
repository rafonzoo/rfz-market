import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import type { NextApiRequest, NextApiResponse, NextPage } from 'next'

export type BaseResponse<R = {}> = {
  success: boolean
  data: R | null
}

export type NextProtectedPage<T = {}> = NextPage<{ user: DecodedIdToken | null } & T>

export type NextRequest<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => void

export interface FetchRequest<C = {}, M = {}> {
  response: C
  payload: M
}
