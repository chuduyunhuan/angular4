import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { UtilComponent } from './util.component';
import { UtilRoutingModule } from './util-routing.module';


@NgModule({
  imports: [SharedModule, UtilRoutingModule],
  declarations: [UtilComponent],
  exports: [UtilComponent]
})

export class UtilModule {}