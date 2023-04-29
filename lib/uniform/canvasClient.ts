import {CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE, CanvasClient,} from "@uniformdev/canvas";
import runEnhancers from "./enhancers";
import {ProjectMapClient} from '@uniformdev/project-map';


export const canvasClient = new CanvasClient({
  apiKey:import.meta.env.UNIFORM_API_KEY,
  apiHost:import.meta.env.UNIFORM_CLI_BASE_URL,
  projectId:import.meta.env.UNIFORM_PROJECT_ID,
});

export const projectMapClient = new ProjectMapClient({
  apiKey:import.meta.env.UNIFORM_API_KEY,
  apiHost:import.meta.env.UNIFORM_CLI_BASE_URL,
  projectId:import.meta.env.UNIFORM_PROJECT_ID,
});

export async function getNavigationItems() {
  const  projectMapId  = import.meta.env.UNIFORM_PROJECT_MAP_ID

  const { nodes } = await projectMapClient.getNodes({
    projectMapId
  });

  return nodes.map(node => {
    return {
      name: node.name,
      path: node.path
    }
  })
}

export async function getCompositionBySlug(slug: string, preview: boolean) {
  const  projectMapId  = import.meta.env.UNIFORM_PROJECT_MAP_ID

  const { composition } = await canvasClient
    .getCompositionByNodePath({
      projectMapId,
      projectMapNodePath: slug,
      state:
        process.env.NODE_ENV === 'development' || preview
          ? CANVAS_DRAFT_STATE
          : CANVAS_PUBLISHED_STATE
    })

  await runEnhancers(composition);
  return composition;
}