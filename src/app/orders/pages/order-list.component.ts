import { Component, inject, signal ,computed, effect } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  search = signal('');
  pageSize = 5;
  currentPage = signal(1);

  constructor() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders().subscribe((data) => this.orders.set(data));
  }

  get filteredOrders() {
    const searchTerm = this.search().toLowerCase();
    return this.orders().filter(order =>
      order.customer.toLowerCase().includes(searchTerm) ||
      order.id.toString().includes(searchTerm)
    );
  }

  get paginatedOrders() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredOrders.length / this.pageSize);
  }

  changePage(delta: number) {
    const next = this.currentPage() + delta;
    if (next >= 1 && next <= this.totalPages()) {
      this.currentPage.set(next);
    }
  }
  deleteOrder(orderId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      this.orderService.deleteOrder(orderId).subscribe(() => {
        this.orders.set(this.orders().filter(order => order.id !== orderId));
        alert('Order deleted successfully!');
      });
    }
  }
  
}
