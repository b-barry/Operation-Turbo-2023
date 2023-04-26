import {defineEventHandler, getQuery, H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { username, per_page, collection_id } = getQuery(event)
  const result = await $fetch(
    `https://dev.to/api/articles?username=${username}&state=all${
      collection_id ? `&collection_id=${collection_id}` : ''
    }`
  )

  const articles = result.map((article) => {
    return {
      identifier: article.url,
      title: article.title,
      description: article.description,
      date: article.published_timestamp,
      collection_id: article.collection_id,
      image: article.cover_image.split('w_1000/')[1],
    }
  })

  let finalResult = articles

  if (collection_id) {
    finalResult = articles.filter(
      (article) => String(article.collection_id) === String(collection_id)
    )
  }
  return {
    result: finalResult.slice(
      0,
      per_page ? Number(per_page) : finalResult.length
    ),
  }
})
