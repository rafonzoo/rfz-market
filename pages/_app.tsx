import { ProviderAuth } from 'core/context/Auth'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderAuth>
      <Component {...pageProps} />
    </ProviderAuth>
  )
}

export default MyApp
