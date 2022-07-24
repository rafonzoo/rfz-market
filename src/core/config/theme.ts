import type { PaletteMode, PaletteOptions, ThemeOptions } from '@mui/material'

import { grey, common } from '@mui/material/colors'
import { typography } from '@tools/typography'

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
    fontSize: 17,
    button: {
      ...typography.body,
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
          ...typography.caption,
          padding: '0 0.5rem',
          minHeight: '28px',
        },
        sizeLarge: {
          ...typography.body,
          padding: '0 1rem',
          minHeight: '48px',
        },
      },
    },
  },
})
