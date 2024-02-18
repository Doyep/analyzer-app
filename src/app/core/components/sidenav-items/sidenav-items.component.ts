import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MENU_ITEMS } from 'src/app/models/menu-item.model';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { LogoutService } from '../../../services/logout.service';

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
  ) { }

  public onLogout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }
}
