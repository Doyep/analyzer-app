import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Token } from 'src/app/models/token.model';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  public isLoading = false;
  private _newAccessToken$ = new Subject<string>();
  public newAccessToken$ = this._newAccessToken$.asObservable();

  constructor(private httpClient: HttpClient) { }

  public get(token: Token): Observable<Token> {
    const refreshTokenUrl = import.meta.env.NG_APP_API_URL + '/auth/refresh';
    const body = { refreshToken: token.refreshToken };
    return this.httpClient.post<Token>(refreshTokenUrl, body).pipe(
      tap(token => this._newAccessToken$.next(token.accessToken)));
  }
}
