import type { AppProps } from 'next/app'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

import { store } from '@config'
import { AuthContextProvider } from '@context'
import { default as Head } from 'next/head'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Monsta App</title>
        <meta name='description' content='Mudahnya kerja di waktu luang!' />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  )
}

export default MyApp
