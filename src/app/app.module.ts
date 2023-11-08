import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { MoneyFormatPipe } from './pipes/money-format.pipe';
import { TransactionComponent } from './components/transaction/transaction.component';
import { BadgeComponent } from './components/badge/badge.component';
import { TransactionPageComponent } from './pages/transactions/transactions-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { BudgetCategoryComponent } from './components/budget-category/budget-category.component';
import { ModalComponent } from './components/modal/modal.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { BudgetCategoryFormComponent } from './components/budget-category-form/budget-category-form.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { TransactionsCollapsableComponent } from './components/transactions-collapsable/transactions-collapsable.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { DateControllerComponent } from './components/date-controller/date-controller.component';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { BudgetCategoryResumeComponent } from './components/budget-category-resume/budget-category-resume.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    MoneyFormatPipe,
    TransactionComponent,
    BadgeComponent,
    TransactionPageComponent,
    NavbarComponent,
    BudgetComponent,
    BudgetCategoryComponent,
    ModalComponent,
    TransactionFormComponent,
    AlertComponent,
    BudgetCategoryFormComponent,
    ColorPickerComponent,
    TransactionsCollapsableComponent,
    AccountsComponent,
    AccountFormComponent,
    DateControllerComponent,
    BudgetCategoryResumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
