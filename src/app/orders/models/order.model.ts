export interface Order {
    id: number;
    date: string;
    customer: string;
    payment: 'Card' | 'Cash';
    total: number;
    delivery: string;
    items: number;
    fulfillment: 'Fulfilled' | 'Unfulfilled';
    notes?: string;
  }
  