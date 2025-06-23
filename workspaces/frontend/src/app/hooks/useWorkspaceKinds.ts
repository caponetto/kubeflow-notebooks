import { useCallback } from 'react';
import useFetchState, {
  FetchState,
  FetchStateCallbackPromise,
} from '~/shared/utilities/useFetchState';
import { useNotebookAPI } from '~/app/hooks/useNotebookAPI';
import { WorkspacekindsWorkspaceKind } from '~/generated/OpenApiTypes';

const useWorkspaceKinds = (): FetchState<WorkspacekindsWorkspaceKind[]> => {
  const { api, apiAvailable } = useNotebookAPI();
  const call = useCallback<FetchStateCallbackPromise<WorkspacekindsWorkspaceKind[]>>(
    (opts) => {
      if (!apiAvailable) {
        return Promise.reject(new Error('API not yet available'));
      }
      return api.listWorkspaceKinds(opts);
    },
    [api, apiAvailable],
  );

  return useFetchState(call, []);
};

export default useWorkspaceKinds;
