import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { AnalyseComponent }    from './analyse.component';
import { DetailComponent }    from './Detail/detail.component';

const routes: Routes = [
    {
    	path: 'analyse', 
    	component: AnalyseComponent,
    	children: [
    		{
    			path: ':id',
    			component: DetailComponent
    		}
    	]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule {}