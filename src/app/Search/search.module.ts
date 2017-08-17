import { NgModule } from '@angular/core';
import { SharedModule } from '../Shared/shared.module';
import { SearchComponent } from './search.component';

const comList = [SearchComponent];

@NgModule({
  imports: [SharedModule],
  declarations: [...comList],
  exports: [...comList],
  providers: []
})

export class SearchModule {}