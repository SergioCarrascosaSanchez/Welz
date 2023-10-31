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
import { BudgetCategoryItemComponent } from './components/budget-category-item/budget-category-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { BudgetCategoryFormComponent } from './components/budget-category-form/budget-category-form.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

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
    BudgetCategoryItemComponent,
    ModalComponent,
    TransactionFormComponent,
    AlertComponent,
    BudgetCategoryFormComponent,
    ColorPickerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
