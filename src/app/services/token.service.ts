import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { LogoutService } from './logout.service';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(logoutSrv: LogoutService) {
    logoutSrv.logout$.subscribe(() => this.clear());
  }

  public get(): Token | null {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return accessToken && refreshToken ? new Token(accessToken, refreshToken) : null;
  }

  public set(token: Token): void {
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('refresh_token', token.refreshToken);
  }

  public clear() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}
