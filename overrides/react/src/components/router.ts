import { useRouter } from "next/router";

export function useRouterPath() {
  const router = useRouter();
  return router.asPath;
}
