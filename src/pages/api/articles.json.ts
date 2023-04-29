import type {APIContext} from 'astro'

export default async function get({ url }: APIContext) {
  const username = url.searchParams.get('username');
  const per_page = url.searchParams.get('per_page');
  const collection_id = url.searchParams.get('collection_id');

  const data = await fetch(
    `https://dev.to/api/articles?username=${username}&state=all${
      collection_id ? `&collection_id=${collection_id}` : ''
    }`
  );

  const result = await data.json();

  const articles = result.map((article) => {
    return {
      identifier: article.url,
      title: article.title,
      description: article.description,
      date: article.published_timestamp,
      collection_id: article.collection_id,
      image: article.cover_image.split('w_1000/')[1],
    };
  });

  let finalResult = articles;

  if (collection_id) {
    finalResult = articles.filter(
      (article) => String(article.collection_id) === String(collection_id)
    );
  }

  return {
    body: JSON.stringify({
      result: finalResult.slice(
        0,
        per_page ? Number(per_page) : finalResult.length
      ),
    }),
  };
}
