import '@xstyled/system'
import '@emotion/react'
import { ITheme } from '@xstyled/emotion'
import { theme } from '@core'

type AppTheme = ITheme & {
  [X in keyof typeof theme]: typeof theme[X]
}

declare module '@xstyled/system' {
  export interface Theme extends AppTheme {}
}

declare module '@emotion/react' {
  export type Theme = {
    [X in keyof typeof theme]: typeof theme[X]
  }
}
