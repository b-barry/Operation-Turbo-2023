import {toVideo} from '../../lib/helpers'
import {defineEventHandler, getQuery, H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getQuery(event)
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_KEY}`
  )
  const result = await data.json()
  let response

  if (result.error) {
    response = result.error
  } else {
    response = result.items.map((video) => toVideo(video, false))
  }

  return { result: response }
})
