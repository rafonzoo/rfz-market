import type { Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { getThemeOption, getThemePalette } from '@core/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { createContext, useMemo, useState } from 'react'

export const ColorModeContext = createContext<{
  theme: Theme
  toggleColorMode: () => void
}>(undefined!)

export const ColorModeProvider = ({ children }: { children?: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        ...getThemePalette(mode),
        ...getThemeOption(),
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={{ theme, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeContext
