import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class LogoutService {
  private _logout$ = new Subject<void>()
  public logout$ = this._logout$.asObservable()

  public logout(): void {
    this._logout$.next()
  }
}
