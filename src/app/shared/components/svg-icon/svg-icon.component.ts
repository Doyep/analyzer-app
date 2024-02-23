import { Component, Input } from '@angular/core'

export type SvgType = 'admin' | 'dashboard' | 'graph' | 'list' | 'exit' | 'runner' | 'settings' | 'strava';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  @Input({required: true})
  public type!: SvgType
}
