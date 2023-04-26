import {Show, useStore} from '@builder.io/mitosis'
import { ComponentProps } from './uniform.type'
import CldImage from './cld-image.lite'
import UniformSlotLite from './slot-uniform.lite'
import { Image } from './types'
import {TARGET} from "../constants/target";

type HeroProps = ComponentProps<{
  image: Image
  copyLocation: 'left' | 'right'
  verticalAlignment: 'top' | 'middle' | 'bottom'
  textAlignment: 'left' | 'center' | 'right'
  spaceBelow: boolean
}>
export default function HeroLite(props: HeroProps) {
  const state=useStore({
    get sizes(){
      return TARGET==='react' ? '100vw' : 'sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw'
    }
  })
  return (
    <div
      className={`hero relative md:aspect-[1400/600] overflow-hidden mt-20 md:mt-auto ${
        props.spaceBelow ? 'mb-16' : ''
      } `}
    >
      <Show
          when={props.image && props.image?.src}
          else={
            <div className="w-full h-full absolute top-0 left-0">
              <div className="w-full h-full rounded-lg bg-white bg-opacity-10" />
            </div>
          }
      >
        <div className="aspect-[1400/600] md:aspect-auto">
          <CldImage
              width={props.image?.width}
              height={props.image?.height}
              src={props.image?.src}
              alt={props.image?.alt || ''}
              rawTransformations={[props.image?.transformation]}
              loading="eager"
              sizes={state.sizes}
              className="static md:absolute left-0 top-0 object-cover aspect-[1400/600]"
          />
        </div>
      </Show>

      <article
        className={`static m-4 md:m-0 md:absolute ${
          props.textAlignment === 'right' ? 'md:text-right' : ''
        } ${
          !props.textAlignment || props.textAlignment === 'left'
            ? 'md:text-left'
            : ''
        } ${props.textAlignment === 'center' ? 'md:text-center' : ''} ${
          props.copyLocation === 'right' ? 'right-12' : 'left-12'
        } 
      ${props.verticalAlignment === 'top' ? 'top-12' : ''} ${
          props.verticalAlignment === 'bottom' ? 'bottom-12' : ''
        } ${
          !props.verticalAlignment || props.verticalAlignment === 'middle'
            ? 'top-2/4 md:-translate-y-2/4'
            : ''
        }`}
      >
        <UniformSlotLite name="title" />
        <UniformSlotLite name="description" />
        <UniformSlotLite name="cta" />
      </article>
    </div>
  )
}
