import type { NextPage } from 'next'

import { AuthContext } from 'core/context/Auth'
import { getRedirectResult, GoogleAuthProvider } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { firebaseAuth } from 'core/firebase'
import { Appkey } from 'core/config'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem(Appkey.tokenStates)) {
      getRedirectResult(firebaseAuth)
        .then((user) => user && location.reload())
        .catch(() => /* Toast error*/ void 0)

      localStorage.removeItem(Appkey.tokenStates)
    }
  }, [])

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server'
export default Masuk
