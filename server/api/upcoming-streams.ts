import {toVideo} from '../../lib/helpers'
import {defineEventHandler, getQuery, H3Event} from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getQuery(event)
  const data = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&key=${process.env.YOUTUBE_KEY}&eventType=upcoming&type=video`
  )
  const result = await data.json()

  let response
  if (result.error) {
    response = result.error
  } else {
    const videos = result.items.map((video) => toVideo(video, false))
    response = { meta: { amount: videos.length }, result: videos }
  }

  return response
})
