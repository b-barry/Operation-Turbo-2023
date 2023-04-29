import {toVideo} from "../../../lib/helpers"
import type {APIContext} from 'astro'

export default async function get({ url }: APIContext) {
  const id = url.searchParams.get('id')
  const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_KEY}`)
  const result = await data.json()
  let response;

  if (result.error) {
    response = result.error
  }
  else {
    response = result.items.map(video => (toVideo(video, false)))
  }

  return {
    body: JSON.stringify({ result: response }),
  }
}