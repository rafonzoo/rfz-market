import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import type { GetServerSideProps } from 'next'

import { serialize } from 'cookie'
import { Appkey, isProtected, Routes } from 'core/config'
import { firebaseAdmin } from 'core/firebase/admin'

export const ProtectedPage: GetServerSideProps = async (ctx) => {
  const admin = firebaseAdmin()
  const token = ctx.req.cookies[Appkey.tokenCookie]

  let props: { user: DecodedIdToken | null } = { user: null }
  let redirect: boolean | object = false

  if (token) {
    try {
      if (!isProtected(ctx.resolvedUrl)) {
        // Generate decodedId only if the routes is not authenticating page
        // instead generate user for pages that will be redirect.
        props = { user: await admin.auth().verifyIdToken(token) }
      } else {
        redirect = { destination: Routes.beranda }
      }
    } catch (error) {
      // Token has problem. If current page is authenticated page,
      // redirect them to signin page and remove the broken token.
      redirect = isProtected(ctx.resolvedUrl) ? { destination: Routes.masuk } : false
      ctx.res.setHeader(
        'Set-Cookie',
        serialize(Appkey.tokenCookie, '', { path: Routes.beranda, maxAge: 0 })
      )
    }

    return { props, redirect }
  }

  return { props, redirect }
}
