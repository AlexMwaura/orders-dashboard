import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrderComponent } from './create-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['createOrder']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CreateOrderComponent, CommonModule, ReactiveFormsModule],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.orderForm.valid).toBeFalse();
  });

  it('should validate required form fields', () => {
    const form = component.orderForm;
    form.patchValue({
      customer: '',
      date: '',
      payment: '',
      total: 0,
      delivery: '',
      items: 0
    });

    expect(form.valid).toBeFalse();
    expect(form.get('customer')?.hasError('required')).toBeTrue();
    expect(form.get('total')?.hasError('min')).toBeTrue();
  });

  it('should call createOrder and navigate on valid form submit', () => {
    const formValues: Omit<Order, 'id'> = {
      customer: 'Test Customer',
      date: '2025-05-01',
      payment: 'Cash', // now TypeScript sees this as literal type
      total: 100,
      delivery: 'Home',
      items: 2,
      fulfillment: 'Unfulfilled',
      notes: 'Test note'
    };
    
    const mockCreatedOrder: Order = { id: 1, ...formValues };
    
    mockOrderService.createOrder.and.returnValue(of(mockCreatedOrder));
    

    component.orderForm.setValue(formValues);
    mockOrderService.createOrder.and.returnValue(of({ ...formValues, id: 1 }));

    spyOn(window, 'alert'); 

    component.onSubmit();

    expect(mockOrderService.createOrder).toHaveBeenCalledWith(jasmine.objectContaining(formValues));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders']);
    expect(window.alert).toHaveBeenCalledWith('Order created successfully!');
  });

  it('should not submit the form if it is invalid', () => {
    component.orderForm.patchValue({ customer: '' }); 
    component.onSubmit();
    expect(mockOrderService.createOrder).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
