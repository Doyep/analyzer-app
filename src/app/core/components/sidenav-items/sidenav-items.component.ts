import { Component } from '@angular/core';
import { MENU_ITEMS } from 'src/app/models/menu-item.model';
import { Router, RouterModule } from '@angular/router';
import { LogoutService } from '../../services/logout.service';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidenav-items',
  standalone: true,
  templateUrl: './sidenav-items.component.html',
  styleUrl: './sidenav-items.component.scss',
  imports: [RouterModule, SvgIconComponent],
})
export class SidenavItemsComponent {
  public readonly menuItems = MENU_ITEMS;

  constructor(
    private logoutService: LogoutService,
    private router: Router,
  ) {}

  public onLogout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }
}
