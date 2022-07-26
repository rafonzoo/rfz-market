import type { NextPage } from 'next'

import { auth } from '@core/app'
import { Appkey } from '@core/config'
import { getRedirectResultAction } from '@store/auth/action'
import { useAuthContext, useMounted, useRedux } from '@tools/hook'
import { GoogleAuthProvider } from 'firebase/auth'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useAuthContext()
  const [, dispatch] = useRedux((state) => state)

  useMounted(() => {
    if (localStorage.getItem(Appkey.AL_SSID_ONLOAD)) {
      dispatch(getRedirectResultAction(auth))
    }
  })

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from '@core/server'
export default Masuk
