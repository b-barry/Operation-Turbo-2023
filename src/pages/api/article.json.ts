import type {APIContext} from 'astro'

export default async function get({ url }: APIContext) {
  const id = url.searchParams.get('id')
  const data = await fetch(`https://dev.to/api/articles/${id}`)

  const result = await data.json()

  return {
    body: JSON.stringify({ result }),
  }
}
