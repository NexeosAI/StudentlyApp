declare module 'react-katex' {
  import { FC } from 'react'

  interface KatexProps {
    math: string
    block?: boolean
    errorColor?: string
    renderError?: (error: Error | TypeError) => JSX.Element
    settings?: {
      displayMode?: boolean
      throwOnError?: boolean
      errorColor?: string
      macros?: object
      colorIsTextColor?: boolean
      maxSize?: number
      maxExpand?: number
      strict?: boolean | string | (keyof KatexProps)[]
    }
  }

  export const InlineMath: FC<KatexProps>
  export const BlockMath: FC<KatexProps>
}
