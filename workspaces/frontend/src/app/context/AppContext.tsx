import React, { ReactNode, useContext, useMemo } from 'react';
import { ConfigSettings, UserSettings } from 'mod-arch-shared';

export type AppContextType = {
  config: ConfigSettings | null;
  user: UserSettings | null;
};

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // TODO: replace these values with `const { configSettings, userSettings } = useSettings();`
  const configSettings = null;
  const userSettings: UserSettings = useMemo(
    () => ({
      userId: 'kubeflow-user',
      clusterAdmin: true,
    }),
    [],
  );

  const contextValue = useMemo(
    () => ({
      config: configSettings,
      user: userSettings,
    }),
    [configSettings, userSettings],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
