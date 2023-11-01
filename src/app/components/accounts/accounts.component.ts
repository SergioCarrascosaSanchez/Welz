import { Component, Input } from '@angular/core';
import { Account } from 'src/app/interfaces/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent {
  @Input() accounts: Account[] = [];
  title: string = Title;
  emptyMessage = EmptyMessage;
}

export const Title = 'Cuentas bancarias:';
export const EmptyMessage = 'No hay ninguna cuenta bancaria.';
