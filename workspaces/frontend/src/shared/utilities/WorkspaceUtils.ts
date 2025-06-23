import { WorkspacesWorkspace, WorkspacesWorkspaceState } from '~/generated/OpenApiTypes';
import {
  CPU_UNITS,
  MEMORY_UNITS_FOR_PARSING,
  OTHER,
  splitValueUnit,
} from '~/shared/utilities/valueUnits';

export type ResourceType = 'cpu' | 'memory' | 'gpu';

export enum YesNoValue {
  Yes = 'Yes',
  No = 'No',
}

export const extractResourceValue = (
  workspace: WorkspacesWorkspace,
  resourceType: ResourceType,
): string | undefined =>
  workspace.podTemplate.options.podConfig.current.labels.find((label) => label.key === resourceType)
    ?.value;

export const formatResourceValue = (v: string | undefined, resourceType?: ResourceType): string => {
  if (v === undefined) {
    return '-';
  }
  switch (resourceType) {
    case 'cpu': {
      const [cpuValue, cpuUnit] = splitValueUnit(v, CPU_UNITS);
      return `${cpuValue ?? ''} ${cpuUnit.name}`;
    }
    case 'memory': {
      const [memoryValue, memoryUnit] = splitValueUnit(v, MEMORY_UNITS_FOR_PARSING);
      return `${memoryValue ?? ''} ${memoryUnit.name}`;
    }
    default:
      return v;
  }
};

export const formatResourceFromWorkspace = (
  workspace: WorkspacesWorkspace,
  resourceType: ResourceType,
): string => formatResourceValue(extractResourceValue(workspace, resourceType), resourceType);

export const formatWorkspaceIdleState = (workspace: WorkspacesWorkspace): string =>
  workspace.state !== WorkspacesWorkspaceState.WorkspaceStateRunning
    ? YesNoValue.Yes
    : YesNoValue.No;

export const isWorkspaceWithGpu = (workspace: WorkspacesWorkspace): boolean =>
  workspace.podTemplate.options.podConfig.current.labels.some((label) => label.key === 'gpu');

export const isWorkspaceIdle = (workspace: WorkspacesWorkspace): boolean =>
  workspace.state !== WorkspacesWorkspaceState.WorkspaceStateRunning;

export const filterWorkspacesWithGpu = (workspaces: WorkspacesWorkspace[]): WorkspacesWorkspace[] =>
  workspaces.filter(isWorkspaceWithGpu);

export const filterIdleWorkspaces = (workspaces: WorkspacesWorkspace[]): WorkspacesWorkspace[] =>
  workspaces.filter(isWorkspaceIdle);

export const filterRunningWorkspaces = (workspaces: WorkspacesWorkspace[]): WorkspacesWorkspace[] =>
  workspaces.filter(
    (workspace) => workspace.state === WorkspacesWorkspaceState.WorkspaceStateRunning,
  );

export const filterIdleWorkspacesWithGpu = (
  workspaces: WorkspacesWorkspace[],
): WorkspacesWorkspace[] => filterIdleWorkspaces(filterWorkspacesWithGpu(workspaces));

export type WorkspaceGpuCountRecord = { workspaces: WorkspacesWorkspace[]; gpuCount: number };

export const groupWorkspacesByNamespaceAndGpu = (
  workspaces: WorkspacesWorkspace[],
  order: 'ASC' | 'DESC' = 'DESC',
): Record<string, WorkspaceGpuCountRecord> => {
  const grouped: Record<string, WorkspaceGpuCountRecord> = {};

  for (const workspace of workspaces) {
    const [gpuValueRaw] = splitValueUnit(extractResourceValue(workspace, 'gpu') || '0', OTHER);
    const gpuValue = Number(gpuValueRaw) || 0;

    grouped[workspace.namespace] ??= { gpuCount: 0, workspaces: [] };
    grouped[workspace.namespace].gpuCount += gpuValue;
    grouped[workspace.namespace].workspaces.push(workspace);
  }

  return Object.fromEntries(
    Object.entries(grouped).sort(([, a], [, b]) =>
      order === 'ASC' ? a.gpuCount - b.gpuCount : b.gpuCount - a.gpuCount,
    ),
  );
};

export const countGpusFromWorkspaces = (workspaces: WorkspacesWorkspace[]): number =>
  workspaces.reduce((total, workspace) => {
    const [gpuValue] = splitValueUnit(extractResourceValue(workspace, 'gpu') || '0', OTHER);
    return total + (gpuValue ?? 0);
  }, 0);
