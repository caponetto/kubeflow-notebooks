import { NamespacesNamespace } from '~/generated/OpenApiTypes';
import { buildMockNamespace } from '~/shared/mock/mockBuilder';

export const mockNamespaces: NamespacesNamespace[] = [
  buildMockNamespace({ name: 'default' }),
  buildMockNamespace({ name: 'kubeflow' }),
  buildMockNamespace({ name: 'custom-namespace' }),
];
