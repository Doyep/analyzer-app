import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from 'src/app/core/components/sidenav/sidenav.component';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss'
})
export class SidebarLayoutComponent {

}
