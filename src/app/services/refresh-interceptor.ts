import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { EMPTY, Observable, catchError, finalize, switchMap, take, tap, throwError } from 'rxjs'
import { LogoutService } from 'src/app/services/logout.service'
import { RefreshTokenService } from './refresh-token.service'
import { addTokenHeader } from './token-interceptor'
import { TokenService } from './token.service'

export const refreshTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.error.statusCode === 401 && error.error.message === 'expired token')
      return handleExpiredTokenError(req, next, error)
    return throwError(() => error)
  }))
}

const handleExpiredTokenError = (req: HttpRequest<unknown>, next: HttpHandlerFn, error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
  console.log('refreshInterceptor', req.url)
  const refreshService = inject(RefreshTokenService)
  if (refreshService.isLoading) return waitForToken(req, next)

  const tokenService = inject(TokenService)
  const token = tokenService.get()
  if (!token) return throwError(() => error)

  refreshService.isLoading = true
  return refreshService.get(token).pipe(
    tap(token => tokenService.set(token)),
    switchMap(token => next(addTokenHeader(req, token.accessToken))),
    catchError(() => logoutAndRedirect()),
    finalize(() => refreshService.isLoading = false)
  )
}

const waitForToken = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return inject(RefreshTokenService).newAccessToken$.pipe(
    take(1),
    switchMap(token => next(addTokenHeader(req, token))))
}

const logoutAndRedirect = () => {
  inject(LogoutService).logout()
  inject(Router).navigate(['/login'])
  return EMPTY
}
