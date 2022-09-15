import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spin-mnr-web';
  isCollapsed: boolean = false;

  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  sidenav() {
    if (this.innerWidth <= 1280) {
      this.isCollapsed = true;
    }
  }
}
