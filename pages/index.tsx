import type { NextProtectedPage } from 'types'

import { AuthContext } from 'context/Auth'
import { AppRoutes } from 'core/config'
import { Link } from 'core/import'
import { useContext } from 'react'

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

export { ProtectedPage as getServerSideProps } from 'core/server/redirect'
export default Home
