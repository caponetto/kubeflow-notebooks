import {
  HealthCheckHealthCheck,
  NamespacesNamespace,
  WorkspacekindsWorkspaceKind,
  WorkspacesWorkspace,
  WorkspacesWorkspaceCreate,
} from '~/generated/OpenApiTypes';
import { APIOptions, RequestData } from '~/shared/api/types';
import { WorkspacePauseState } from '~/shared/api/backendApiTypes';

// Health
export type GetHealthCheck = (opts: APIOptions) => Promise<HealthCheckHealthCheck>;

// Namespace
export type ListNamespaces = (opts: APIOptions) => Promise<NamespacesNamespace[]>;

// Workspace
export type ListAllWorkspaces = (opts: APIOptions) => Promise<WorkspacesWorkspace[]>;
export type ListWorkspaces = (
  opts: APIOptions,
  namespace: string,
) => Promise<WorkspacesWorkspace[]>;
export type GetWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
) => Promise<WorkspacesWorkspace>;
export type CreateWorkspace = (
  opts: APIOptions,
  namespace: string,
  data: RequestData<WorkspacesWorkspaceCreate>,
) => Promise<WorkspacesWorkspace>;
export type UpdateWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
  data: RequestData<unknown>, // TODO: Replace `unknown` with specific type when available
) => Promise<WorkspacesWorkspace>;
export type PatchWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
  data: RequestData<unknown>, // TODO: Replace `unknown` with specific type when available
) => Promise<WorkspacesWorkspace>;
export type DeleteWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
) => Promise<void>;
export type PauseWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
) => Promise<WorkspacePauseState>;
export type StartWorkspace = (
  opts: APIOptions,
  namespace: string,
  workspace: string,
) => Promise<WorkspacePauseState>;

// WorkspaceKind
export type ListWorkspaceKinds = (opts: APIOptions) => Promise<WorkspacekindsWorkspaceKind[]>;
export type GetWorkspaceKind = (
  opts: APIOptions,
  kind: string,
) => Promise<WorkspacekindsWorkspaceKind>;
export type CreateWorkspaceKind = (
  opts: APIOptions,
  data: RequestData<unknown>, // TODO: Replace `unknown` with specific type when available
) => Promise<WorkspacekindsWorkspaceKind>;
export type UpdateWorkspaceKind = (
  opts: APIOptions,
  kind: string,
  data: RequestData<unknown>, // TODO: Replace `unknown` with specific type when available
) => Promise<WorkspacekindsWorkspaceKind>;
export type PatchWorkspaceKind = (
  opts: APIOptions,
  kind: string,
  data: RequestData<unknown>, // TODO: Replace `unknown` with specific type when available
) => Promise<WorkspacekindsWorkspaceKind>;
export type DeleteWorkspaceKind = (opts: APIOptions, kind: string) => Promise<void>;

export type NotebookAPIs = {
  // Health
  getHealthCheck: GetHealthCheck;
  // Namespace
  listNamespaces: ListNamespaces;
  // Workspace
  listAllWorkspaces: ListAllWorkspaces;
  listWorkspaces: ListWorkspaces;
  getWorkspace: GetWorkspace;
  createWorkspace: CreateWorkspace;
  updateWorkspace: UpdateWorkspace;
  patchWorkspace: PatchWorkspace;
  deleteWorkspace: DeleteWorkspace;
  pauseWorkspace: PauseWorkspace;
  startWorkspace: StartWorkspace;
  // WorkspaceKind
  listWorkspaceKinds: ListWorkspaceKinds;
  getWorkspaceKind: GetWorkspaceKind;
  createWorkspaceKind: CreateWorkspaceKind;
  updateWorkspaceKind: UpdateWorkspaceKind;
  patchWorkspaceKind: PatchWorkspaceKind;
  deleteWorkspaceKind: DeleteWorkspaceKind;
};
