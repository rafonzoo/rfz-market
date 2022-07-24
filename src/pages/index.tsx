import type { NextProtectedPage } from '@type/page'

import { Link } from '@core'
import { AppRoutes } from '@core/config'
import { Box } from '@mui/material'
import { useAuthContext, useThemeContext } from '@tools/hook'

import Button from '@components/Button'

const Home: NextProtectedPage = ({ user }) => {
  const { logout } = useAuthContext()
  const { theme, toggleColorMode } = useThemeContext()

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
      <div style={{ margin: '0 10px' }}>
        <Link href={AppRoutes.masuk}>
          <Button>Masuk</Button>
        </Link>
      </div>
      <div>
        <Box sx={{ height: '1px', background: theme.palette.divider, my: 3 }}></Box>
        <Button onClick={toggleColorMode}>{theme.palette.mode} mode</Button>
      </div>
    </div>
  )
}

export { ProtectedPage as getServerSideProps } from '@server/redirect'
export default Home
