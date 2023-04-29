import {createClient} from 'contentful';
import type {Talk} from '../../../lib/types';
import {toTalk} from '../../../lib/helpers';
import type {APIContext} from 'astro';

export default async function get({ url }: APIContext) {
  const id = url.searchParams.get('id');
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  });

  const entry = await client.getEntries<Talk>({
    content_type: 'talk',
    'fields.slug[match]': id,
  });

  const { fields } = entry.items[0];
  const result = toTalk(fields);

  return {
    body: JSON.stringify({ meta: { amount: 0 }, result }),
  };
}
