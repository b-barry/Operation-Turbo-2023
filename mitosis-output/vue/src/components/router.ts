import {useRoute} from "nuxt/app";

export function useRouterPath() {
  const route = useRoute();
  return route.path;
}
