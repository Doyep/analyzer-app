import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerMenuComponent, MenuState } from "../burger-menu/burger-menu.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { UserService } from '../../services/user.service';
import { Subject, filter, map, tap } from 'rxjs';
import { SvgIconComponent } from "../../../shared/components/svg-icon/svg-icon.component";
import { MENU_ITEMS } from 'src/app/models/menu-item.model';
import { SidenavItemsComponent } from "../sidenav-items/sidenav-items.component";

@Component({
    selector: 'app-sidenav',
    standalone: true,
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    imports: [CommonModule, BurgerMenuComponent, RouterModule, SvgIconComponent, SidenavItemsComponent]
})
export class SidenavComponent {
  private _menuState$ = new Subject<MenuState>();
  public menuState$ = this._menuState$.asObservable();

  public isMenuOpen = false;
  public mobileTitle: WritableSignal<string>;
  public user = toSignal(this.userService.authUser$);
  public readonly menuItems = MENU_ITEMS;

  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private userService: UserService,
  ) {
    this.mobileTitle = signal(this.toTitle(this.router.url));
    toSignal(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.closeMenu()),
      map(event => (event as unknown as NavigationStart).url),
      map(url => this.toTitle(url)),
      tap(title => this.mobileTitle.set(title))
    ));
  }

  private toTitle(url: string) {
    if (url === '/profile') return `${this.user()?.firstName} ${this.user()?.lastName}`;
    return MENU_ITEMS.find(menuItem => menuItem.link === url)?.title ?? '';
  }

  private closeMenu() {
    this._menuState$.next('closed');
  }

  public onLogout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }

  public onMenuStateChange(menuState: MenuState) {
    this.isMenuOpen = menuState === 'opened';
  }
}
