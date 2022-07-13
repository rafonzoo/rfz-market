import type { NextPage } from 'next'

import { AuthContext } from 'core/context/Auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useContext } from 'react'

const Masuk: NextPage = () => {
  const { signInWithProvider } = useContext(AuthContext)

  return (
    <button onClick={() => signInWithProvider(new GoogleAuthProvider())}>
      Masuk dengan Google
    </button>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server'
export default Masuk
