import CldImage from './cld-image.lite';
import theme from 'tailwindcss/defaultTheme';

export default function CardImageLite(props: {
  alt: string;
  src: string;
  component: { variant?: string };
}) {
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
  );
}
