import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { MapComponent } from './map.component';
import { MapComponent2 } from './map2.component';
import { MapRoutingModule } from './map-routing.module';
import { MapService } from './map.service';

@NgModule({
  imports: [SharedModule, MapRoutingModule],
  declarations: [MapComponent, MapComponent2],
  exports: [MapComponent, MapComponent2],
  providers: [MapService]
})

export class MapModule {}