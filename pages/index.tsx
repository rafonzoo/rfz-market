import type { NextProtectedPage } from 'types'

import { AppRoutes } from 'core/config'
import { AuthContext } from 'context/Auth'
import { useContext } from 'react'
import { axios, Link } from 'core/import'

const Home: NextProtectedPage = ({ user }) => {
  const { logout } = useContext(AuthContext)

  const testApi = async () => {
    try {
      const res = await axios.get('/api/auth/test')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

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
      <p>
        <button onClick={testApi}>Test API</button>
      </p>
    </div>
  )
}

export { ProtectedPage as getServerSideProps } from 'core/server/redirect'
export default Home
