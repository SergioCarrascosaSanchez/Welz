import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbarItems = [
    {
      text: 'Home',
      route: '/',
    },
    {
      text: 'Presupuesto',
      route: '/budget',
    },
    {
      text: 'Movimientos',
      route: '/transactions',
    },
  ];
}
