import {createClient} from 'contentful';
import type {Talk} from '../../../lib/types';
import {toTalk} from '../../../lib/helpers';
import  type {APIContext} from 'astro';

export default async function get({ url }: APIContext) {
  const count = url.searchParams.get('count');
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  });

  const entries = await client.getEntries<Talk>({
    content_type: 'talk',
    order: '-fields.date',
    limit: count || 100,
  });

  const result = entries.items.map((item) => toTalk(item.fields));

  return {
    body: JSON.stringify({ meta: { amount: result.length }, result }),
  };
}
