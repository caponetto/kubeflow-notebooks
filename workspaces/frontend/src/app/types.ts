import {
  WorkspacekindsImageConfigValue,
  WorkspacekindsPodConfigValue,
  WorkspacekindsWorkspaceKind,
  WorkspacesPodSecretMount,
  WorkspacesPodVolumeMount,
  WorkspacesWorkspace,
} from '~/generated/OpenApiTypes';

export interface WorkspaceColumnDefinition {
  name: string;
  label: string;
  id: string;
}
export interface WorkspaceKindsColumns {
  icon: WorkspaceColumnDefinition;
  name: WorkspaceColumnDefinition;
  description: WorkspaceColumnDefinition;
  deprecated: WorkspaceColumnDefinition;
  numberOfWorkspaces: WorkspaceColumnDefinition;
}

export interface WorkspaceFormProperties {
  workspaceName: string;
  deferUpdates: boolean;
  homeDirectory: string;
  volumes: WorkspacesPodVolumeMount[];
  secrets: WorkspacesPodSecretMount[];
}

export interface WorkspaceFormData {
  kind: WorkspacekindsWorkspaceKind | undefined;
  image: WorkspacekindsImageConfigValue | undefined;
  podConfig: WorkspacekindsPodConfigValue | undefined;
  properties: WorkspaceFormProperties;
}

export interface WorkspaceCountPerOption {
  count: number;
  countByImage: Record<WorkspacekindsImageConfigValue['id'], number>;
  countByPodConfig: Record<WorkspacekindsPodConfigValue['id'], number>;
  countByNamespace: Record<WorkspacesWorkspace['namespace'], number>;
}
