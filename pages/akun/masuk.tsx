import type { NextPage } from 'next'

import { auth } from '@firebase/client'
import { getRedirectResultAction } from '@store/auth/action'
import { storage } from '@tools/helper'
import { useAuthContext, useMounted, useRedux } from '@tools/hook'
import { GoogleAuthProvider } from 'firebase/auth'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useAuthContext()
  const [, dispatch] = useRedux((state) => state)

  useMounted(() => {
    if (storage.get('AL_SSID_ONLOAD')) {
      dispatch(getRedirectResultAction(auth))
    }
  })

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from '@server/redirect'
export default Masuk
