import type { MetaInterface } from '@store/meta'
import type { FetchRequest } from '@type'
import type { UserInfo } from 'firebase/auth'

export interface AuthData extends MetaInterface {
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
