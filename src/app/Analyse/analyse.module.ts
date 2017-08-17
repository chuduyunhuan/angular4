import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { AnalyseComponent } from './analyse.component';
import { DetailComponent }    from './Detail/detail.component';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { AnalyseService } from './analyse.service';

@NgModule({
  imports: [SharedModule, AnalyseRoutingModule],
  declarations: [AnalyseComponent, DetailComponent],
  providers: [AnalyseService]
})

export class AnalyseModule {}