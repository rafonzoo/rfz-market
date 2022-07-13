import type { AppProps } from 'next/app'

import { ProviderAuth } from 'context/Auth'
import { Provider } from 'react-redux'
import { store } from 'store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ProviderAuth>
        <Component {...pageProps} />
      </ProviderAuth>
    </Provider>
  )
}

export default MyApp
