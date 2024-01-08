import { Component } from '@angular/core';
import { ALERT_TYPES } from 'src/app/components/alert/alert.component';
import { Account } from 'src/app/interfaces/account.model';
import { BudgetCategory } from 'src/app/interfaces/budgetCategory.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  title = 'budget-app';
  username: string = '';
  addModalOpen = false;
  dataLoaded = false;
  alertType = ALERT_TYPES.danger;
  accounts: Account[];
  categories: BudgetCategory[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchData();

    this.username = this.dataService.getUsername();
    this.dataService.loadedData.subscribe((state) => {
      this.dataLoaded = state;
      this.username = this.dataService.getUsername();

      if (state) {
        this.accounts = this.dataService.getAccounts();
        this.categories = this.dataService.getBudgetCategories();

        this.dataService.dataChange.subscribe(() => {
          this.accounts = this.dataService.getAccounts();
          this.categories = this.dataService.getBudgetCategories();
        });
      }
    });
  }

  onAdd() {
    this.addModalOpen = true;
  }

  onClose() {
    this.addModalOpen = false;
  }
}
