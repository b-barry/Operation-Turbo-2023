import {
  Context,
  ContextPlugin,
  enableContextDevTools,
  enableDebugConsoleLogDrain,
  ManifestV2,
} from "@uniformdev/context";
import manifest from "./contextManifest.json";

export default function createUniformContext(
  serverContext?: unknown
): Context {
  const plugins: ContextPlugin[] = [
    enableContextDevTools(),
    enableDebugConsoleLogDrain("debug"),
  ];
  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    // TODO @tim transistore is needed?
    plugins: plugins,
  });
  return context;
}
