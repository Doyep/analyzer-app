import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public array: Array<string> = []

  public constructor() {
    for (let i = 0; i < 50; i++) this.array.push((i+1).toString())
  }
}
