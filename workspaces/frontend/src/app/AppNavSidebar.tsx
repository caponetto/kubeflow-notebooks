import * as React from 'react';
import { NavSidebar } from 'mod-arch-shared';
import { useNavData } from '~/app/AppRoutes';

const AppNavSidebar: React.FC = () => {
  const navData = useNavData();
  return <NavSidebar navData={navData} />;
};

export default AppNavSidebar;
