import {defineEventHandler, getQuery, H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getQuery(event)
  const result = await $fetch(`https://dev.to/api/articles/${id}`)

  return {
    result,
  }
})
