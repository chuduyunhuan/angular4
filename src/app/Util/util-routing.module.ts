import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { UtilComponent }    from './util.component';


const routes: Routes = [
    {path: 'util', component: UtilComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilRoutingModule {}