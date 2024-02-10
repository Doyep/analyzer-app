import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { LogoutService } from './logout.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _authUser$ = new BehaviorSubject<void>(undefined);

  constructor(
    private logoutService: LogoutService,
    private http: HttpClient
  ) { }


  private _getAuthUser$ = this.http.get<User>(import.meta.env.NG_APP_API_URL + '/user');

  public authUser$ = this._authUser$.pipe(
    switchMap(() => this._getAuthUser$),
    shareReplay(1),
    takeUntil(this.logoutService.logout$)
  );

  public refreshUser() {
    this._authUser$.next();
  }
}
