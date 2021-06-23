import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceCalculatorComponent } from './components/price-calculator/price-calculator.component';
import { PriceListComponent } from './components/price-list/price-list.component';

const routes: Routes = [
    { path: 'price-list', component: PriceListComponent },
    { path: 'price-calculator', component: PriceCalculatorComponent },
    { path: '**', redirectTo: 'price-calculator'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }