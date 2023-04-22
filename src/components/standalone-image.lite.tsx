import {Show} from '@builder.io/mitosis';
import {Image} from '../../lib/types';
import {ComponentProps} from './uniform.type';
import CldImage from './cld-image.lite';

type StandAloneImageProps = ComponentProps<{
  image: Image[];
  title: string;
  spaceBelow: string;
}>;
export default function StandaloneImageLite(props: StandAloneImageProps) {
  return (
    <Show when={props.image && props.image[0]?.publicId}>
      <CldImage
        width={props.image[0]?.width}
        height={props.image[0]?.height}
        src={props.image[0]?.publicId}
        alt={props.image[0]?.alt || props.title}
        rawTransformations={[props.image[0]?.transformation]}
        loading="eager"
        sizes="100vw"
        className={`object-cover fancy-image ${props.spaceBelow ? 'mb-8' : ''}`}
      />
    </Show>
  );
}
