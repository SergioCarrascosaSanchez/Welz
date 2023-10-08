import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionPageComponent } from './pages/transactions/transactions-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budget', component: HomeComponent },
  {
    path: 'transactions',
    component: TransactionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
