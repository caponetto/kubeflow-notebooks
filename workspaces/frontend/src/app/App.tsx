import React from 'react';
import '@patternfly/patternfly/patternfly-addons.css';
import '@patternfly/react-core/dist/styles/base.css';
import 'mod-arch-shared/style/MUI-theme.scss';
import '~/app/app.css';
import { Page, PageSidebar } from '@patternfly/react-core/dist/esm/components/Page';
import {
  DeploymentMode,
  logout,
  NavBar,
  ToastNotifications,
  useModularArchContext,
} from 'mod-arch-shared';
import ErrorBoundary from '~/app/error/ErrorBoundary';
import AppNavSidebar from '~/app/AppNavSidebar';
import AppRoutes from '~/app/AppRoutes';
import { AppContextProvider } from '~/app/context/AppContext';
import { NamespaceContextProvider } from '~/app/context/NamespaceContextProvider';
import { NotebookContextProvider } from '~/app/context/NotebookContext';

const App: React.FC = () => {
  const { config } = useModularArchContext();
  const { deploymentMode } = config;
  const isStandalone = deploymentMode === DeploymentMode.Standalone;

  return (
    <ErrorBoundary>
      <AppContextProvider>
        <NotebookContextProvider>
          <NamespaceContextProvider>
            <Page
              mainContainerId="primary-app-container"
              masthead={
                isStandalone ? (
                  <NavBar
                    onLogout={() => {
                      logout().then(() => window.location.reload());
                    }}
                  />
                ) : (
                  ''
                )
              }
              isManagedSidebar={isStandalone}
              sidebar={isStandalone ? <AppNavSidebar /> : <PageSidebar isSidebarOpen={false} />}
            >
              <AppRoutes />
              <ToastNotifications />
            </Page>
          </NamespaceContextProvider>
        </NotebookContextProvider>
      </AppContextProvider>
    </ErrorBoundary>
  );
};

export default App;
