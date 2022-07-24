import type { ButtonProps } from '@mui/material'
import type { ForwardedRef } from 'react'

import { Button as MDCButton } from '@mui/material'
import { forwardRef } from 'react'

const Button = (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return <MDCButton variant='contained' disableElevation ref={ref} {...props} />
}

export default forwardRef(Button)
