export function useRouterPath() {
  return globalThis?.window?.location?.href;
}
