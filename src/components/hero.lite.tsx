import {Show} from '@builder.io/mitosis';
import {ComponentProps} from './uniform.type';
import CldImage from './cld-image.lite';
import UniformSlot from './slot-uniform.lite';
import {Image} from "./types";

type HeroProps = ComponentProps<{
  image: Image[];
  copyLocation: 'left' | 'right';
  verticalAlignment: 'top' | 'middle' | 'bottom';
  textAlignment: 'left' | 'center' | 'right';
  spaceBelow: boolean;
}>;
export default function HeroLite(props: HeroProps) {
  return (
    <div
      className={`hero relative md:aspect-[1400/600] overflow-hidden mt-20 md:mt-auto ${
        props.spaceBelow ? 'mb-16' : ''
      } `}
    >
      <Show when={props.image && props.image[0]?.publicId} else={(
          <div className="w-full h-full absolute top-0 left-0">
            <div className="w-full h-full rounded-lg bg-white bg-opacity-10" />
          </div>
      )}>
        <div className="aspect-[1400/600] md:aspect-auto">
          <CldImage
              width={props.image[0]?.width}
              height={props.image[0]?.height}
              src={props.image[0]?.publicId}
              alt={props.image[0]?.alt || ''}
              rawTransformations={[props.image[0]?.transformation]}
              loading="eager"
              sizes="100vw"
              className="static md:absolute left-0 top-0 object-cover aspect-[1400/600]"
          />
        </div>
      </Show>

      <article
        className={`static m-4 md:m-0 md:absolute ${
            props.textAlignment === 'right' ? 'md:text-right' : ''
        } ${!props.textAlignment || props.textAlignment === 'left' ? 'md:text-left' : ''} ${
            props.textAlignment === 'center' ? 'md:text-center' : ''
        } ${props.copyLocation === 'right' ? 'right-12' : 'left-12'} 
      ${props.verticalAlignment === 'top' ? 'top-12' : ''} ${
            props.verticalAlignment === 'bottom' ? 'bottom-12' : ''
        } ${
          !props.verticalAlignment || props.verticalAlignment === 'middle'
            ? 'top-2/4 md:-translate-y-2/4'
            : ''
        }`}
      >
        <UniformSlot
          name="title"
          emptyPlaceholder={<div className="h-12"></div>}
        />
        <UniformSlot
          name="description"
          emptyPlaceholder={<div className="h-12"></div>}
        />
        <UniformSlot
          name="cta"
          emptyPlaceholder={<div className="h-12"></div>}
        />
      </article>
    </div>
  );
}
