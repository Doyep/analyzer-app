import { NgClass } from '@angular/common'
import { Component, computed, model } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MenuState } from 'src/app/components/burger-menu/burger-menu.component'
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component"
import { SidebarNavComponent } from "./sidebar-nav/sidebar-nav.component"

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss',
  imports: [NgClass, RouterOutlet, SidebarHeaderComponent, SidebarNavComponent]
})
export class SidebarLayoutComponent {
  state = model<MenuState>('closed')
  isOpen = computed(() => this.state() === 'opened')
}
