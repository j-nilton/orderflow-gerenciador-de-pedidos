import { OrderItem } from './OrderItem';

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
}
