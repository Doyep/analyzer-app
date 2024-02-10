import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, switchMap, take, tap, throwError } from 'rxjs';
import { RefreshTokenService } from '../services/refresh-token.service';
import { addTokenHeader } from './token-interceptor';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

export const refreshInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.error.statusCode === 401 && error.error.message === 'expired token')
      return handleExpiredTokenError(req, next, error);
    return throwError(() => error);
  }));
};

const handleExpiredTokenError = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  error: HttpErrorResponse
): Observable<HttpEvent<unknown>> => {
  const refreshService = inject(RefreshTokenService);
  if (refreshService.isLoading) return waitForToken(req, next);

  const tokenService = inject(TokenService);
  const token = tokenService.get();
  if (!token) return throwError(() => error);

  refreshService.isLoading = true;
  return refreshService.get(token).pipe(
    tap(token => tokenService.set(token)),
    switchMap(token => next(addTokenHeader(req, token.accessToken))),
    catchError(() => redirectToLogin()),
    finalize(() => refreshService.isLoading = false)
  );
};

const waitForToken = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return inject(RefreshTokenService).newAccessToken$.pipe(
    take(1),
    switchMap(token => next(addTokenHeader(req, token))));
};

const redirectToLogin = () => {
  inject(Router).navigate(['/login']);
  return EMPTY;
};
