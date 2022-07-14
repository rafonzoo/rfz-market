import type { NextProtectedPage } from 'types'

import { AppRoutes } from 'core/config'
import { AuthContext } from 'context/Auth'
import { useContext } from 'react'
import { Link } from 'core/import'

const Home: NextProtectedPage = ({ user }) => {
  const { logout } = useContext(AuthContext)

  if (user) {
    return (
      <div>
        Halo {user.email}!
        <p>
          <Link href={AppRoutes.masuk}>Masuk</Link>
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
        <Link href={AppRoutes.masuk}>Masuk</Link>
      </p>
    </div>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server'
export default Home
