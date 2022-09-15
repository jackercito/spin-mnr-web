import { Component } from '@angular/core';
//import { Auth0Service } from './services/auth0.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spin-mnr-web';
  isCollapsed: boolean = false;
}
