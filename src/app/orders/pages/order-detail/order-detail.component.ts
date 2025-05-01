import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);

  order = signal<Order | null>(null);
  editForm: FormGroup = this.fb.group({
    fulfillment: [''],
    notes: ['']
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrder(id).subscribe(order => {
      this.order.set(order);
      this.editForm.patchValue({
        fulfillment: order.fulfillment,
        notes: order.notes
      });
    });
  }

  onSave() {
    if (!this.order()) return;
  
    const updatedOrder: Order = {
      ...this.order()!,
      ...this.editForm.value
    };
  
    this.orderService.updateOrder(updatedOrder).subscribe(() => {
      alert('Order updated successfully!');
      this.router.navigate(['/orders']);
    });
  }
  
}
