import { useCallback } from 'react';
import useFetchState, {
  FetchState,
  FetchStateCallbackPromise,
} from '~/shared/utilities/useFetchState';
import { useNotebookAPI } from '~/app/hooks/useNotebookAPI';
import { NamespacesNamespace } from '~/generated/OpenApiTypes';

const useNamespaces = (): FetchState<NamespacesNamespace[] | null> => {
  const { api, apiAvailable } = useNotebookAPI();

  const call = useCallback<FetchStateCallbackPromise<NamespacesNamespace[] | null>>(
    (opts) => {
      if (!apiAvailable) {
        return Promise.reject(new Error('API not yet available'));
      }

      return api.listNamespaces(opts);
    },
    [api, apiAvailable],
  );

  return useFetchState(call, null);
};

export default useNamespaces;
