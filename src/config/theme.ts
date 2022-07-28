import type { PaletteMode, PaletteOptions, ThemeOptions } from '@mui/material'

import { common, grey } from '@mui/material/colors'

export const getTypography = (key: keyof typeof typography) => {
  const typography = {
    body: {
      fontSize: 17,
      letterSpacing: '-0.013em',
      lineHeight: 1.475,
    },
    caption: {
      fontSize: 14,
      letterSpacing: '0',
      lineHeight: 1.2857,
    },
  }

  return typography[key]
}

export const getThemePalette = (mode: PaletteMode): { palette: PaletteOptions } => ({
  palette: {
    mode,
    primary: {
      main: '#2563EB',
    },
    text: {
      primary: grey[mode === 'light' ? '900' : '100'],
    },
    divider: 'rgb(136 136 136 / 30%)',
    background: {
      default: mode === 'light' ? common.white : common.black,
    },
  },
})

export const getThemeOption = (): ThemeOptions => ({
  typography: {
    htmlFontSize: 16,
    body1: getTypography('body'),
    button: {
      ...getTypography('body'),
      fontWeight: 400,
      textTransform: 'none',
    },
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          padding: '0 0.75rem',
          minHeight: '36px',
        },
        sizeSmall: {
          ...getTypography('caption'),
          padding: '0 0.5rem',
          minHeight: '28px',
        },
        sizeLarge: {
          ...getTypography('body'),
          padding: '0 1rem',
          minHeight: '48px',
        },
      },
    },
  },
})
