import { NgModule }            from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { MapComponent }    from './map.component';
import { MapComponent2 }    from './map2.component';

const routes: Routes = [
    {path: 'map', component: MapComponent},
    {path: 'map2', component: MapComponent2}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}