import { defineEventHandler, H3Event, readBody } from 'h3'
import { enhance } from '@uniformdev/canvas'
import runEnhancers, { enhancerBuilder } from '~/lib/uniform/enhancers'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const composition = body.composition

  await runEnhancers(composition)

  return { composition }
})
