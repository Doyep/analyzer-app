import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http'
import { inject } from '@angular/core'
import { Observable } from 'rxjs'
import { TokenService } from './token.service'

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const token = inject(TokenService).get()?.accessToken
  if (req.url.includes('/auth') || !token) return next(req)
  return next(addTokenHeader(req, token))
}

export const addTokenHeader = (req: HttpRequest<unknown>, token: string): HttpRequest<unknown> => {
  console.log('tokenInterceptor', req.url)
  return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
}
