import type { NextProtectedPage } from '@type'

import { AppRoutes } from '@config'
import { Anchor } from '@tools/helper'
import { useAuthContext, useCommon } from '@tools/hook'

import Button from '@components/Button'

const Home: NextProtectedPage = ({ user }) => {
  const { logout } = useAuthContext()
  const { t } = useCommon()

  if (user) {
    return (
      <div>
        Halo {user.email}!
        <p>
          <Anchor href={AppRoutes.masuk}>Masuk</Anchor>
        </p>
        <p>
          <button onClick={logout}>Logout</button>
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* <div>You`re not logged in</div> */}
      <div>{t('auth.notLogin')}</div>
      <Anchor href={AppRoutes.masuk}>
        <Button>Masuk</Button>
      </Anchor>
    </div>
  )
}

export { ProtectedPage as getServerSideProps } from '@server/redirect'
export default Home
