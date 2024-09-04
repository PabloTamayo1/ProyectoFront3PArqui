import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from './servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public loginService: LoginService, private router: Router) {}

  title = 'proyectoFront';

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
