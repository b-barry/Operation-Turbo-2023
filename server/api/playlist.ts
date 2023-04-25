import { toVideo } from '../../lib/helpers'
import { defineEventHandler, getQuery, H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { id, count } = getQuery(event)
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${
      process.env.YOUTUBE_KEY
    }&maxResults=${count || 5}`
  )

  const result = await data.json()
  let response

  if (result.error) {
    response = result.error
  } else {
    response = result.items
      .map((video) => toVideo(video, true))
      .filter((video) => video.title !== 'Deleted video')
  }

  return { result: response }
})
