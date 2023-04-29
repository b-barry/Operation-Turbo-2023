import type {APIContext} from 'astro';
import {toVideo} from "../../../lib/helpers";

async function fetchAllStreams(id, count, order) {
  let allData = [];
  let morePagesAvailable = true;
  let pageToken = false;
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&key=${
    process.env.YOUTUBE_KEY
  }&eventType=completed&type=video&maxResults=${count || 3}&order=${
    order || 'date'
  }`;

  while (morePagesAvailable) {
    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }

    const response = await fetch(url);
    let { items, nextPageToken, error } = await response.json();

    if (error) {
      return { error };
    }

    items.forEach((item) => allData.push(item));

    morePagesAvailable = nextPageToken ? true : false;

    if (count < allData.length + 1) {
      morePagesAvailable = false;
    }

    pageToken = nextPageToken;
  }

  return allData;
}

export default async function get({ url }: APIContext) {
  const id = url.searchParams.get('id');
  const count = url.searchParams.get('count');
  const order = url.searchParams.get('order');

  const data: any = await fetchAllStreams(id, count, order);

  let response;
  if (data.error) {
    response = data.error;
  } else {
    const videos = data.map((video) => toVideo(video, false));
    response = { meta: { amount: videos.length, order }, result: videos };
  }

  return {
    body: JSON.stringify(response),
  };
}
