import type { NextPage } from 'next'

import { AuthContext } from 'context/Auth'
import { Appkey } from 'core/config'
import { firebaseAuth } from 'core/firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { getRedirectResultAction } from 'store/auth/action'
import { useRedux } from 'tools/hook'

const Masuk: NextPage = () => {
  const { mounted, signInWithProvider } = useContext(AuthContext)
  const [, dispatch] = useRedux((state) => state)

  useEffect(() => {
    if (mounted && localStorage.getItem(Appkey.AL_SSID_ONLOAD)) {
      dispatch(getRedirectResultAction(firebaseAuth))
    }
  }, [dispatch, mounted])

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server/redirect'
export default Masuk
