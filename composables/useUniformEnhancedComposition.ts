import { ProjectMapClient } from '@uniformdev/project-map'
import { useRuntimeConfig } from '#imports'
export async function useUniformEnhancedComposition(parameters: any) {
  const results = await useUniformComposition({
    ...parameters,
    unstable_resolveData: true,
    enhance: async (composition) => {
      const { composition: enhancedComposition } = await $fetch(
        '/api/preview',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ composition }),
        }
      )

      return enhancedComposition
    },
  })

  const projectMapClient = new ProjectMapClient({
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL,
    projectId: process.env.UNIFORM_PROJECT_ID,
  })
  const nodes = await projectMapClient
    .getNodes({
      projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
    })
    .then((data) => {
      return data.nodes.map((node) => {
        return {
          name: node.name,
          path: node.path,
        }
      })
    })

  return {
    ...results,
    nodes,
  }
}
