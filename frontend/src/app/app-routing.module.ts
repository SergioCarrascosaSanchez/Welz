import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionPageComponent } from './pages/transactions/transactions-page.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './guards/auth/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  {
    path: 'user',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/accounts' },
      { path: 'accounts', component: HomeComponent },
      { path: 'budget', component: BudgetComponent },
      {
        path: 'transactions',
        component: TransactionPageComponent,
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
