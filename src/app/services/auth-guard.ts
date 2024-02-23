import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot
} from '@angular/router'
import { catchError, map, of } from 'rxjs'
import { LogoutService } from 'src/app/services/logout.service'
import { TokenService } from 'src/app/services/token.service'
import { UserService } from './user.service'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const logoutSrv = inject(LogoutService)
  const loginURLTree = createUrlTreeFromSnapshot(route, ['/login'])

  const tokenSrv = inject(TokenService)
  if (!tokenSrv.get()) {
    logoutSrv.logout()
    return loginURLTree
  }

  return inject(UserService).authUser$.pipe(
    map(() => true),
    catchError(() => {
      logoutSrv.logout()
      return of(loginURLTree)
    })
  )
}

