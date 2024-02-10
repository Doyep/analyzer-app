import { HttpParams } from "@angular/common/http";

export function stravaAuthorizeUrl(): string {
  const url = import.meta.env.NG_APP_STRAVA_AUTHORIZE_URL
  const params = new HttpParams({
    fromObject: {
      client_id: import.meta.env.NG_APP_STRAVA_CLIENT_ID,
      response_type: 'code',
      redirect_uri: `${location.origin}/#/exchange-token`,
      approval_prompt: 'force',
      scope: 'read_all,profile:read_all,activity:read_all',
    },
  }).toString();
  return `${url}?${params}`;
}
// TODO - can be improved
// private login$ = this.activatedRoute.queryParams.pipe(
//   filter(params => params['code']),
//   tap(() => (this.isLoggingIn = true)),
//   switchMap(params => this.authService.login(params['code'])),
//   tap(() => this.router.navigateByUrl('/')),
//   catchError(() => {
//     this.isLoggingIn = false;
//     return EMPTY;
//   })
// );
