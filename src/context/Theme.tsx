import type { Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { getCSSBaseline, getRootVariable, theme } from '@config'
import { GlobalStyles } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { storage } from '@tools/helper'
import { createContext, useEffect, useState } from 'react'

export const ColorModeContext = createContext<{
  theme: Theme
  toggleColorMode: () => void
}>(undefined!)

export const ColorModeProvider = ({ children }: { children?: ReactNode }) => {
  const [mode, setMode] = useState('light')

  const toggleColorMode = () => {
    const currentTheme = mode === 'light' ? 'dark' : 'light'
    const reversed = mode === 'light' ? 'light' : 'dark'

    setMode(currentTheme)
    storage.set('AL_STATE_THEME', currentTheme)

    theme.palette.mode = currentTheme
    document.documentElement.classList.replace(reversed, currentTheme)
  }

  useEffect(() => {
    const currentTheme = storage.get('AL_STATE_THEME') ?? 'light'

    theme.palette.mode = currentTheme as 'light' | 'dark'
    setMode(currentTheme)
  }, [])

  return (
    <ColorModeContext.Provider value={{ theme, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={(theme) => ({
            ...getRootVariable(theme),
            ...getCSSBaseline(theme),
          })}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ColorModeContext
