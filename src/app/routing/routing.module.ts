import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SubnetComponent } from '../sections/subnet/subnet.component';
import { NetworkComponent } from '../sections/network/network.component';
import { NotificationsComponent } from '../sections/notifications/notifications.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'subnets', component: SubnetComponent },
  { path: 'nodes', component: NetworkComponent },
  { path: 'notifications', component: NotificationsComponent },
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
