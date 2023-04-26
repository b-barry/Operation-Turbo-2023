import {toVideo} from '../../lib/helpers'
import {defineEventHandler, getQuery, H3Event} from 'h3'

async function fetchAllVideos(id, count, order) {
  let allData = []
  let morePagesAvailable = true
  let pageToken = false
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${id}&key=${
    process.env.YOUTUBE_KEY
  }&order=${order || 'date'}&maxResults=${count || 3}`

  while (morePagesAvailable) {
    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`
    }

    const response = await $fetch(url)
    let { items, nextPageToken, error } = await response.json()

    if (error) {
      return { error }
    }

    items.forEach((item) => allData.push(item))

    morePagesAvailable = nextPageToken ? true : false

    if (count < allData.length + 1) {
      morePagesAvailable = false
    }

    pageToken = nextPageToken
  }

  return allData
}

export default defineEventHandler(async (event: H3Event) => {
  const { id, count, order } = getQuery(event)

  const data: any = await fetchAllVideos(id, count, order)

  let response
  if (data.error) {
    response = data.error
  } else {
    const videos = data
      .map((video) => toVideo(video, false))
      .filter((video) => video.videoId)
      .filter((video) => !video.title.includes('#shorts'))
    response = { meta: { amount: videos.length, order }, result: videos }
  }

  return response
})
