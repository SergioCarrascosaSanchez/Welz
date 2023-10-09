import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { AccountComponent } from './components/account/account.component';
import { MoneyFormatPipe } from './pipes/money-format.pipe';
import { TransactionComponent } from './components/transaction/transaction.component';
import { BadgeComponent } from './components/badge/badge.component';
import { TransactionPageComponent } from './pages/transactions/transactions-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { BudgetCategoryComponent } from './components/budget-category/budget-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    AccountComponent,
    MoneyFormatPipe,
    TransactionComponent,
    BadgeComponent,
    TransactionPageComponent,
    NavbarComponent,
    BudgetComponent,
    BudgetCategoryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
