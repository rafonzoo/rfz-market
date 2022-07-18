import type { UserInfo } from 'firebase/auth'
import type { FetchRequest } from 'types'

export interface AuthData {
  user: UserInfo | null
}

export type VerifyUser = FetchRequest<
  {
    isVerified: boolean
  },
  {
    token?: string
  }
>
