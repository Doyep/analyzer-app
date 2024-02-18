import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LogoutService } from 'src/app/services/logout.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const token = inject(TokenService).get()
  if (!token) return logoutAndRedirect(route)

  return inject(UserService).authUser$.pipe(
    map(() => true),
    catchError(() => of(logoutAndRedirect(route)))
  )
};

const logoutAndRedirect = (route: ActivatedRouteSnapshot) => {
  inject(LogoutService).logout()
  return createUrlTreeFromSnapshot(route, ['/login'])
}
