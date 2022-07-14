import type { NextPage } from 'next'

import { AuthContext } from 'context/Auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useContext } from 'react'
import { firebaseAuth } from 'core/client/app'
import { Appkey } from 'core/client'
import { useMounted, useRedux } from 'helpers/hook'
import { getRedirectResultAction } from 'store/auth/action'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useContext(AuthContext)
  const [, dispatch] = useRedux((state) => state)

  useMounted(() => {
    if (localStorage.getItem(Appkey.tokenStates)) {
      dispatch(getRedirectResultAction(firebaseAuth))
    }
  })

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server'
export default Masuk
