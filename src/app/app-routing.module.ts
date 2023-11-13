import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionPageComponent } from './pages/transactions/transactions-page.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user' },
  {
    path: 'user',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'budget', component: BudgetComponent },
      {
        path: 'transactions',
        component: TransactionPageComponent,
      },
    ],
  },
  { path: 'auth', component: AuthFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
