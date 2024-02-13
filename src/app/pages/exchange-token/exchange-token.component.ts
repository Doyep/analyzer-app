import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

interface stravaExchangeToken {
  code?: string,
  error?: string,
  scope?: string,
  state?: string,
}

@Component({
  selector: 'app-exchange-token',
  standalone: true,
  imports: [],
  templateUrl: './exchange-token.component.html',
  styleUrl: './exchange-token.component.scss'
})
export class ExchangeTokenComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginSrv: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const stravaParam: stravaExchangeToken = this.activatedRoute.snapshot.queryParams;
    if (stravaParam.error) return this.redirectWithError('Access denied.')
    if (!stravaParam.code) return

    this.loginSrv.login(stravaParam.code).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.redirectWithError('Service unavailable, please try later.')
    })
  }

  public get title() { return 'Loading'.split('') }

  private redirectWithError(error: string) {
    this.router.navigate(['/login'], { queryParams: { error } })
  }
}
