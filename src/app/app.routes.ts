import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
