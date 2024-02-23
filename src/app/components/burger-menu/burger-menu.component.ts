import { Component, HostListener, computed, model } from '@angular/core'

export type MenuState = 'opened' | 'closed'

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenuComponent {
  state = model<MenuState>('closed')
  isOpen = computed(() => this.state() === 'opened')

  @HostListener('change', ['$event.target.checked'])
  onStateChange(checked: boolean): void {
    this.state.set(checked ? 'opened' : 'closed')
  }
}
