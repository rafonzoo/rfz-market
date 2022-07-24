import type { FetchRequest } from '@type/http'
import type { UserInfo } from 'firebase/auth'

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
