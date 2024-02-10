import { Component } from '@angular/core';
import { stravaAuthorizeUrl } from 'src/app/core/utils/strava';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public get stravaUrl() {
    return stravaAuthorizeUrl();
  }
}
