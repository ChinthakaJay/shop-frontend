import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { PriceCalculatorComponent } from './components/price-calculator/price-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceListComponent,
    PriceCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
