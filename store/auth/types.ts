import type { User } from 'firebase/auth'
import type { FetchRequest } from 'types'

export interface AuthData {
  user: User | null
}

export type VerifyUser = FetchRequest<
  {
    isVerified: boolean
  },
  {
    token?: string
  }
>
