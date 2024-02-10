import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Token } from 'src/app/models/token.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public login(authorizationCode: string): Observable<void> {
    const path = import.meta.env.NG_APP_API_URL + '/auth/authenticate';
    const body = { authorizationCode };
    return this.http
      .post<Token>(path, body)
      .pipe(map(token => this.tokenService.set(token)));
  }
}
