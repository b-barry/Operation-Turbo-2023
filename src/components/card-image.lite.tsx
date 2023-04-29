import CldImage from './cld-image.lite'
import theme from 'tailwindcss/defaultTheme'
import { useStore } from '@builder.io/mitosis'
import {TARGET} from "../constants/target";

export default function CardImageLite(props: {
  alt: string
  src: string
  component: { variant?: string }
}) {
  const state = useStore({
    get sizes() {
      if (TARGET === 'react') {
        return props.component?.variant
          ? '400px'
          : `(min-width: ${theme.screens.md}) 33vw, 100vw`
      }

      return props.component?.variant
        ? 'sm:400px md:400px lg:400px xl:400px xxl:400px 2xl:400px'
        : 'sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw'
    },
  })
  return (
    <CldImage
      width={720}
      height={405}
      alt={props.alt}
      loading="lazy"
      src={props.src}
      crop="fill"
      className="fancy-image"
      deliveryType="fetch"
      sizes={`${
        props.component?.variant
          ? '400px'
          : `(min-width: ${theme.screens.md}) 33vw, 100vw`
      }`}
    />
  )
}
