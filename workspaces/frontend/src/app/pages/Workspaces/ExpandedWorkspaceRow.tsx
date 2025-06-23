import React from 'react';
import { ExpandableRowContent, Td, Tr } from '@patternfly/react-table';
import { DataVolumesList } from '~/app/pages/Workspaces/DataVolumesList';
import { WorkspaceTableColumnKeys } from '~/app/components/WorkspaceTable';
import { WorkspacesWorkspace } from '~/generated/OpenApiTypes';

interface ExpandedWorkspaceRowProps {
  workspace: WorkspacesWorkspace;
  columnKeys: WorkspaceTableColumnKeys[];
}

export const ExpandedWorkspaceRow: React.FC<ExpandedWorkspaceRowProps> = ({
  workspace,
  columnKeys,
}) => {
  const renderExpandedData = () =>
    columnKeys.map((colKey, index) => {
      switch (colKey) {
        case 'name':
          return (
            <Td noPadding colSpan={1} key={colKey}>
              <ExpandableRowContent>
                <DataVolumesList workspace={workspace} />
              </ExpandableRowContent>
            </Td>
          );
        default:
          return <Td key={index} />;
      }
    });

  return (
    <Tr>
      <Td />
      {renderExpandedData()}
    </Tr>
  );
};
