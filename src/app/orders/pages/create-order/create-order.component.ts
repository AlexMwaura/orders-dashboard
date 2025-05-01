import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})
export class CreateOrderComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private orderService = inject(OrderService);

  orderForm: FormGroup = this.fb.group({
    customer: ['', Validators.required],
    date: ['', Validators.required],
    payment: ['', Validators.required],
    total: [0, [Validators.required, Validators.min(1)]],
    delivery: ['', Validators.required],
    items: [0, [Validators.required, Validators.min(1)]],
    fulfillment: ['Unfulfilled', Validators.required],
    notes: ['']
  });

  onSubmit() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.orderService.createOrder(this.orderForm.value).subscribe(() => {
      // Show toast here (stubbed)
      alert('Order created successfully!');
      this.router.navigate(['/orders']);
    });
  }

}
