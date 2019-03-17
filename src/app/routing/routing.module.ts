import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductSwitcherComponent } from '../sections/product/product-switcher.component';
import { SubnetComponent } from '../sections/subnet/subnet.component';
import { OperatorsComponent } from '../sections/operators/operators.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductSwitcherComponent },
  { path: 'subnet', component: SubnetComponent },
  { path: 'operators', component: OperatorsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
