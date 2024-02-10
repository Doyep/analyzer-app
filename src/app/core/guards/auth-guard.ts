import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of, take } from 'rxjs';
import { TokenService } from '../services/token.service';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const loginUrl = createUrlTreeFromSnapshot(
    route,
    ['/login'],
    route.queryParams
  );
  const tokenService = inject(TokenService);
  if (!tokenService.get()) {
    inject(LocalStorageService).clear();
    return loginUrl;
  }

  const userService = inject(UserService);
  return userService.authUser$.pipe(
    take(1),
    map(() => true),
    catchError(() => of(loginUrl))
  );
};
