import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { stravaAuthorizeUrl } from 'src/app/utils/strava'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public error = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.error = this.activatedRoute.snapshot.queryParams['error']
    if (this.error) this.clearQuerParams()
  }

  public get stravaUrl() {
    return stravaAuthorizeUrl()
  }

  public clearQuerParams() {
    this.router.navigate([], { queryParams: { error: null }, queryParamsHandling: 'merge' })
  }
}
