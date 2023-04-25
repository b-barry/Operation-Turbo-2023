import {defineEventHandler, getQuery, H3Event, sendRedirect} from 'h3';

export default defineEventHandler((event: H3Event) => {
  const query = getQuery(event);

  return sendRedirect(
    event,
    // At the moment, I hardcoe the base url, I saw that you have function to resolve it based on the configuration
    `http://localhost:4200${query?.path}?${new URLSearchParams(
      query as Record<string, string>
    )?.toString()}`
  );
});
