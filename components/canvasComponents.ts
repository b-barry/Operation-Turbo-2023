import {DefaultNotImplementedComponent,} from '@uniformdev/canvas-vue'

import Hero from '../mitosis-output/vue/src/components/hero'
import Cta from '../mitosis-output/vue/src/components/cta'
import Title from '../mitosis-output/vue/src/components/title'
import RichText from '../mitosis-output/vue/src/components/rich-text'
import TwoColumn from '../mitosis-output/vue/src/components/two-column'
import List from '../mitosis-output/vue/src/components/list'
import Card from '../mitosis-output/vue/src/components/card'
import Container from '../mitosis-output/vue/src/components/container'
import StandAloneImage from '../mitosis-output/vue/src/components/standalone-image'
import {ComponentInstance} from 'vue'

type UniformComponent = {
  type: string | string[]
  variantId?: string
  component: any
}
const components: UniformComponent[] = [
  { type: 'hero', component: Hero },
  { type: 'twoColumn', component: TwoColumn },
  { type: 'cta', component: Cta },
  { type: 'standAloneImage', component: StandAloneImage },

  { type: 'container', component: Container },
  { type: 'container', variantId: 'fullWidth', component: Container },

  { type: 'list', component: List },
  { type: 'list', variantId: 'grid', component: List },
  { type: 'list', variantId: 'list', component: List },

  { type: 'card', component: Card },
  { type: 'card', variantId: 'small', component: Card },

  { type: 'title', component: Title },
  { type: 'title', variantId: 'small', component: Title },
  { type: 'title', variantId: 'medium', component: Title },
  { type: 'title', variantId: 'large', component: Title },

  { type: 'richText', component: RichText },
  { type: 'richText', variantId: 'addedSpace', component: RichText },
]

export function resolveRenderer(componentInstance: ComponentInstance) {
  return (
    components.find((c) => c.type === componentInstance.type)?.component ??
    DefaultNotImplementedComponent
  )
}
