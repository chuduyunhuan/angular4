import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from  './Shared/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}