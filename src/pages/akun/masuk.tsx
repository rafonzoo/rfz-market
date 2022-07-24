import type { NextPage } from 'next'

import { AuthContext } from '@context/Auth'
import { Appkey } from '@core/config'
import { firebaseAuth } from '@core/firebase/client'
import { getRedirectResultAction } from '@store/auth/action'
import { useMounted, useRedux } from '@tools/hook'
import { GoogleAuthProvider } from 'firebase/auth'
import { useContext } from 'react'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useContext(AuthContext)
  const [, dispatch] = useRedux((state) => state)

  useMounted(() => {
    if (localStorage.getItem(Appkey.AL_SSID_ONLOAD)) {
      dispatch(getRedirectResultAction(firebaseAuth))
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
