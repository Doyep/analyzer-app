import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  isMobile = toSignal(fromEvent(window, 'resize').pipe(
    startWith(window),
    map(() => window.innerWidth < 480)), {
    initialValue: window.innerWidth < 480
  })
}
