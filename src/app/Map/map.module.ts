import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { MapService } from './map.service';

@NgModule({
  imports: [SharedModule, MapRoutingModule],
  declarations: [MapComponent],
  providers: [MapService]
})

export class MapModule {}