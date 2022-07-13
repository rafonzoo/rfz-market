import type { NextProtectedPage } from 'types'

import { Routes } from 'core/config'
import { AuthContext } from 'core/context/Auth'
import { useContext } from 'react'

import Link from 'next/link'

const Home: NextProtectedPage = ({ user }) => {
  const { logout } = useContext(AuthContext)

  if (user) {
    return (
      <div>
        Halo {user.email}!
        <p>
          <Link href={Routes.masuk}>Masuk</Link>
        </p>
        <p>
          <button onClick={logout}>Logout</button>
        </p>
      </div>
    )
  }

  return (
    <div>
      You`re not logged in
      <p>
        <Link href={Routes.masuk}>Masuk</Link>
      </p>
    </div>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server'
export default Home
