import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbarItems = navbarItems;
}

export const navbarItems = [
  {
    text: 'Home',
    route: '/user/',
  },
  {
    text: 'Presupuesto',
    route: '/user/budget',
  },
  {
    text: 'Movimientos',
    route: '/user/transactions',
  },
];
