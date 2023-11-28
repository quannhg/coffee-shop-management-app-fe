import { server, invoke } from '@services';

export const projectDocumentService = {
  add: (projectId: string, materialId: string, payload: ProjectDocumentParams) =>
    invoke<ProjectDocumentParams>(
      server.post(`/api/projects/names-list/${projectId}/${materialId}`, payload)
    ),
  edit: (projectId: string, materialId: string, payload: ProjectDocumentParams) =>
    invoke<ProjectDocumentParams>(
      server.put(`/api/projects/names-list/${projectId}/${materialId}`, payload)
    ),
  remove: (projectId: string, materialId: string, name: string) =>
    invoke<ProjectDocumentParams>(
      server.delete(`/api/projects/names-list/${projectId}/${materialId}/${name}`)
    )
};
