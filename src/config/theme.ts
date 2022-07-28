import type { Interpolation, Theme } from '@mui/material'

import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { cssvar, cssVarRoot } from '@tools/helper'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
    },
    divider: 'rgb(136 136 136 / 30%)',
  },
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

export function getRootVariable(theme: Theme) {
  return {
    ':root:not(.dark)': cssVarRoot([
      ['colorBg', theme.palette.common.white],
      ['colorText', grey['900']],
    ]),
    ':root:not(.light)': cssVarRoot([
      ['colorBg', theme.palette.common.black],
      ['colorText', grey['100']],
    ]),
  }
}

export function getCSSBaseline(theme: Theme): { [x: string]: Interpolation<Theme> } {
  return {
    html: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      direction: 'ltr',
      fontFeatureSettings: '"kern"',
      fontSynthesis: 'none',
      textAlign: 'left',
      backgroundColor: cssvar('colorBg'),
      color: cssvar('colorText'),
    },
    body: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      lineHeight: theme.typography.body1.lineHeight,
      letterSpacing: theme.typography.body1.letterSpacing,
      fontFamily: theme.typography.fontFamily,
      margin: '0',
      padding: '0',
    },
  }
}

export function getTypography(key: keyof typeof typography) {
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
