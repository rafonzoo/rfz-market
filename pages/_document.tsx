import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang='id'>
      <Head />
      <body>
        {/* prettier-ignore */}
        <script>
          document.documentElement.classList.add(
            localStorage.getItem({'`AL_STATE_THEME`'}) || {'`light`'}
          )
        </script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
