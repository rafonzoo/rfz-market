import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import type { NextPage } from 'next'

export type NextProtectedPage<T = {}> = NextPage<{ user: DecodedIdToken | null } & T>
