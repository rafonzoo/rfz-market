import type { User } from 'firebase/auth'
import type { NextPage } from 'next'

export type NextProtectedPage<T = {}> = NextPage<{ user: User | null } & T>
