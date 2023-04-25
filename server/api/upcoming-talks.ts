import type {Talk} from '../../lib/types'
import {toTalk} from '../../lib/helpers'
import {defineEventHandler, getQuery, H3Event} from 'h3'
import * as contentful from "contentful";
const {createClient}= contentful

export default defineEventHandler(async (event: H3Event) => {
  const { count } = getQuery(event)
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  })

  var gt = new Date().toISOString()

  const entries = await client.getEntries<Talk>({
    content_type: 'talk',
    order: '-fields.date',
    'fields.date[gte]': gt,
    limit: count || 100,
  })

  const result = entries.items.map((item) => toTalk(item.fields))
  return { meta: { amount: result.length }, result }
})
