import { Component, Inject  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }
}
