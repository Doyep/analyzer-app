import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environment/environment';
import { LogoutService } from './logout.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _getAuthUser$ = this.http.get<User>(environment.baseApiUrl + '/user')
  private _refreshUser$ = new BehaviorSubject<void>(undefined)

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
  ) { }

  public authUser$ = this._refreshUser$.pipe(
    switchMap(() => this._getAuthUser$),
    shareReplay(1),
    takeUntil(this.logoutService.logout$),
  )

  public refreshUser() {
    this._refreshUser$.next()
  }
}
