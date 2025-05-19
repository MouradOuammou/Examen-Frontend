import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreditsComponent} from './credits/credits.component';
import {RemboursementsComponent} from './remboursements/remboursements.component';

const routes: Routes = [
  { path: 'clients', redirectTo : 'ClientsComponent', pathMatch : 'full' },
  { path: 'credits', component: CreditsComponent },
  { path: 'remboursements', component: RemboursementsComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: '**', redirectTo: '/clients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
