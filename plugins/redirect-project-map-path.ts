// export default defineNuxtPlugin(({ $router }) => {
//   const { query, fullPath } = $router.currentRoute.value;
//   console.log('redirecting', query)
//   if (query.preview && !query.redirected) {
//     const { slug } = query;
//     const url = `${fullPath.replace(
//       "/?preview",
//       `${slug}?preview`
//     )}&redirected=true`;
//
//     $router.push(url);
//   }
// });

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const route = useRoute();
  console.log('redirect project map', !!router, route?.params)

  nuxtApp.hook('app:beforeMount', () => {
    console.log('before mount')
    const nodePath = Array.isArray(route.query.path)
      ? route.query.path[0]
      : route.query.path;

    if (nodePath) {
      router.push({
        path: nodePath,
        query: {
          ...route.query,
          path: undefined,
          slug: undefined,
          id: undefined,
        },
      });
    }
  });
});
