import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import type { GetServerSideProps } from 'next'

import { Appkey, AppRoutes } from '@config'
import { firebaseAdmin } from '@firebase/admin'
import { cookies, isProtectedPage } from '@tools/helper'

export const ProtectedPage: GetServerSideProps = async (ctx) => {
  const admin = firebaseAdmin()
  const token = ctx.req.cookies[Appkey.AC_SSID_SECURE]

  let props: { user: DecodedIdToken | null } = { user: null }
  let redirect: boolean | object = false

  if (token) {
    try {
      if (!isProtectedPage(ctx.resolvedUrl)) {
        // Generate decodedId only if the routes is not authenticating page
        // instead generate user for pages that will be redirect.
        props = { user: await admin.auth().verifyIdToken(token) }
      } else {
        redirect = { destination: AppRoutes.beranda }
      }
    } catch (error) {
      const protectedRoute = isProtectedPage(ctx.resolvedUrl)
      // Token has problem. If current page is authenticated page,
      // redirect them to signin page and remove the broken token.
      redirect = protectedRoute ? { destination: AppRoutes.masuk } : false
      ctx.res.setHeader('Set-Cookie', [
        cookies.unset('AC_SSID_CLIENT'),
        cookies.unset('AC_SSID_SECURE'),
      ])
    }

    return { props, redirect }
  }

  return { props, redirect }
}
