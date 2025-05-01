import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Order } from '../models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch orders', () => {
    const mockOrders: Partial<Order>[] = [{ id: 1, customer: 'Alex' }];
    
    service.getOrders().subscribe(orders => {
      expect(orders.length).toBe(1);
      expect(orders[0].customer).toBe('Alex');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should add an order', () => {
    const newOrder: Partial<Order> = { customer: 'Jane' };

    service.createOrder(newOrder as Order).subscribe(order => {
      expect(order.customer).toBe('Jane');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 123, ...newOrder });
  });

  it('should update an order', () => {
    const order: Order = { id: 1, customer: 'Updated Name', payment: 'Card', date: '', total: 0, delivery: '', items: 0, fulfillment: 'Fulfilled' };

    service.updateOrder(order).subscribe(res => {
      expect(res.customer).toBe('Updated Name');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(order);
  });

  it('should delete an order', () => {
    service.deleteOrder(1).subscribe(res => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
