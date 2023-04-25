import  * as contentful from 'contentful'
import type { Talk } from '../../lib/types'
import { toTalk } from '../../lib/helpers'
import { defineEventHandler, getQuery, H3Event } from 'h3'

const {createClient}= contentful
export default defineEventHandler(async (event: H3Event) => {
  const { id } = getQuery(event)
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  })

  const entry = await client.getEntries<Talk>({
    content_type: 'talk',
    'fields.slug[match]': id,
  })

  const { fields } = entry.items[0]
  const result = toTalk(fields)

  return { meta: { amount: 0 }, result }
})
