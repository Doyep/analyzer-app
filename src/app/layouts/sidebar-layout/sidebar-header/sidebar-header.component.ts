import { Component, computed, inject, model, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router'
import { filter, map, tap } from 'rxjs'
import { NAV_LINK } from 'src/app/models/nav-link.model'
import { ScreenService } from 'src/app/services/screen.service'
import { UserService } from 'src/app/services/user.service'
import { BurgerMenuComponent, MenuState } from "../../../components/burger-menu/burger-menu.component"

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  imports: [BurgerMenuComponent, RouterLink],
  templateUrl: './sidebar-header.component.html',
  styleUrl: './sidebar-header.component.scss',
})
export class SidebarHeaderComponent {
  private readonly screenSrv = inject(ScreenService)
  private readonly userSrv = inject(UserService)
  private readonly router = inject(Router)

  state = model<MenuState>('closed')
  title = computed(() => this.screenSrv.isMobile() ? this.routeTitle() : this.userFullname())
  user = toSignal(this.userSrv.authUser$)
  userFullname = computed(() => this.user()?.firstName + ' ' + this.user()?.lastName)
  routeTitle = signal('')

  constructor() {
    toSignal(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.state.set('closed')),
      map(event => (event as unknown as NavigationStart).url),
      map(url => this.toTitle(url)),
      tap(title => this.routeTitle.set(title))
    ))
  }

  private toTitle(url: string) {
    if (url === '/profile') return `${this.user()?.firstName} ${this.user()?.lastName}`
    return NAV_LINK.find(navItem => navItem.url === url)?.title ?? ''
  }
}
