import { matchPath } from 'react-router-dom';
import { useTypedLocation } from '~/app/routerHelper';
import { AppRouteKey, AppRoutePaths } from '~/app/routes';
import { URL_PREFIX } from '~/shared/utilities/const';

export function useCurrentRouteKey(): AppRouteKey | undefined {
  const location = useTypedLocation();
  const { pathname } = location;

  const routePathname = pathname.startsWith(URL_PREFIX)
    ? pathname.slice(URL_PREFIX.length)
    : pathname;

  const matchEntries = Object.entries(AppRoutePaths) as [AppRouteKey, string][];

  for (const [routeKey, pattern] of matchEntries) {
    const match = matchPath({ path: pattern, end: true }, routePathname);
    if (match) {
      return routeKey;
    }
  }

  return undefined;
}
