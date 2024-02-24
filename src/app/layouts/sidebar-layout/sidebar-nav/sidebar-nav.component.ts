import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { SvgIconComponent } from 'src/app/components/svg-icon/svg-icon.component'
import { NAV_LINK } from 'src/app/models/nav-link.model'
import { LogoutService } from 'src/app/services/logout.service'

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [RouterModule, SvgIconComponent],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss'
})
export class SidebarNavComponent {
  private readonly logoutSrv = inject(LogoutService)
  private readonly router = inject(Router)

  readonly menuLinks = NAV_LINK

  onLogout() {
    this.logoutSrv.logout()
    this.router.navigate(['/login'])
  }

}
