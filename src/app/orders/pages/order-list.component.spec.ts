import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderListComponent } from "./order-list.component";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderListComponent, FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;

    component.orders.set([
      { id: 1, date: '2025-04-01', customer: 'John Doe', payment: 'Card', total: 99.99, delivery: 'Home', items: 2, fulfillment: 'Fulfilled' },
      { id: 2, date: '2025-04-02', customer: 'Jane Doe', payment: 'Cash', total: 49.99, delivery: 'Store', items: 1, fulfillment: 'Unfulfilled' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render order rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should filter orders by search term', () => {
    component.search.set('Jane');
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('Jane Doe');
  });

  it('should change pages correctly', () => {
    spyOn(component, 'changePage').and.callThrough();
    component.orders.set(Array(12).fill({ id: 1, date: '', customer: '', payment: '', total: 0, delivery: '', items: 1, fulfillment: 'Fulfilled' }));
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('.pagination button:last-child'));
    nextButton.nativeElement.click();
    expect(component.changePage).toHaveBeenCalledWith(1);
  });

  it('should call deleteOrder with correct id', () => {
    spyOn(component, 'deleteOrder');
    const deleteBtn = fixture.debugElement.query(By.css('button'));
    deleteBtn.nativeElement.click();
    expect(component.deleteOrder).toHaveBeenCalledWith(1);
  });
});