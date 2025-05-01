import { Routes } from '@angular/router';
import { OrderListComponent } from './orders/pages/order-list.component';
import { CreateOrderComponent } from './orders/pages/create-order/create-order.component';

export const routes: Routes = [ 
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/new', component: CreateOrderComponent }

  ];
