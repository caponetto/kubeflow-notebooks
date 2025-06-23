import React from 'react';
import { Button, List, ListItem } from '@patternfly/react-core';
import { WorkspaceCountPerKind } from '~/app/hooks/useWorkspaceCountPerKind';
import { useTypedNavigate } from '~/app/routerHelper';
import { WorkspacekindsWorkspaceKind } from '~/generated/OpenApiTypes';

type WorkspaceDetailsPodConfigsProps = {
  workspaceKind: WorkspacekindsWorkspaceKind;
  workspaceCountPerKind: WorkspaceCountPerKind;
};

export const WorkspaceKindDetailsPodConfigs: React.FunctionComponent<
  WorkspaceDetailsPodConfigsProps
> = ({ workspaceKind, workspaceCountPerKind }) => {
  const navigate = useTypedNavigate();

  return (
    <List isPlain>
      {workspaceKind.podTemplate.options.podConfig.values.map((podConfig, rowIndex) => (
        <ListItem key={rowIndex}>
          {podConfig.displayName}:{' '}
          <Button
            variant="link"
            isInline
            onClick={() =>
              navigate('workspaceKindSummary', {
                params: { kind: workspaceKind.name },
                state: {
                  podConfigId: podConfig.id,
                },
              })
            }
          >
            {
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              workspaceCountPerKind[workspaceKind.name]
                ? workspaceCountPerKind[workspaceKind.name].countByPodConfig[podConfig.id] ?? 0
                : 0
            }
            {' Workspaces'}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};
