import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private localStorageService: LocalStorageService) {}

  public get(): Token | null {
    const accessToken = this.localStorageService.getData('access_token');
    const refreshToken = this.localStorageService.getData('refresh_token');
    return accessToken && refreshToken
      ? new Token(accessToken, refreshToken)
      : null;
  }

  public set(token: Token): void {
    this.localStorageService.saveData('access_token', token.accessToken);
    this.localStorageService.saveData('refresh_token', token.refreshToken);
  }
}
