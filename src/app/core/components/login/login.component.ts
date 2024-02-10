import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, filter, switchMap, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ButtonComponent]
})
export class LoginComponent {
  public isLoggingIn = false;

  // TODO - can be improved
  private login$ = this.activatedRoute.queryParams.pipe(
    filter(params => params['code']),
    tap(() => (this.isLoggingIn = true)),
    switchMap(params => this.authService.login(params['code'])),
    tap(() => this.router.navigateByUrl('/')),
    catchError(() => {
      this.isLoggingIn = false;
      return EMPTY;
    })
  );
  public login = toSignal(this.login$);

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: LoginService,
    private router: Router
  ) { }

  public get stravaUrl() {
    const params = new HttpParams({
      fromObject: {
        client_id: import.meta.env.NG_APP_STRAVA_CLIENT_ID,
        response_type: 'code',
        redirect_uri: location.origin,
        approval_prompt: 'force',
        scope: 'read_all,profile:read_all,activity:read_all',
      },
    });
    return `${import.meta.env.NG_APP_STRAVA_AUTHORIZE_URL}?${params.toString()}`;
  }
}
