import { Injectable } from '@angular/core';
import { LogoutService } from './logout.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor(private logoutService: LogoutService) {
    this.logoutService.logout$.subscribe(() => this.clear());
  }

  public clear() {
    localStorage.clear();
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
