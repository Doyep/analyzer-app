import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { Token } from 'src/app/models/token.model'
import { environment } from 'src/environment/environment'
import { TokenService } from './token.service'

@Injectable({ providedIn: 'root' })
export class LoginService {
  public constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public login(authorizationCode: string): Observable<void> {
    const path = environment.baseApiUrl + '/auth/authenticate'
    const body = { authorizationCode }

    return this.http
      .post<Token>(path, body)
      .pipe(map(token => this.tokenService.set(token)))
  }
}
