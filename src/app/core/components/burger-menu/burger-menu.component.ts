import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

export type MenuState = 'opened' | 'closed';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenuComponent implements OnInit, OnDestroy {
  @Input()
  public menuState$ = new Observable<MenuState>();

  @Output()
  public menuStateEvent = new EventEmitter<MenuState>();

  @ViewChild('toggleMenu')
  public input?: ElementRef<HTMLInputElement>;

  private _onDestroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.menuState$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(menuState => this.setMenuState(menuState));
  }

  @HostListener('change', ['$event.target.checked'])
  public emitMenuState(checked: boolean): void {
    this.menuStateEvent.emit(checked ? 'opened' : 'closed');
  }

  private setMenuState(state: MenuState): void {
    if (!this.input) return
    const isCheck = state === 'opened';
    this.input.nativeElement.checked = isCheck;
    this.emitMenuState(isCheck);
  }

  public ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
