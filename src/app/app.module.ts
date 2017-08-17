import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MapModule } from './Map/map.module';
import { AnalyseModule } from './Analyse/analyse.module';
import { SearchModule } from './Search/search.module';

import { ClarityModule } from "clarity-angular";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    AnalyseModule,
    SearchModule,
    ClarityModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
