import { Order } from '../entities/Order';
import { Product } from '../entities/Product';

export interface OrderService {
  getOrdersByTableId(tableId: string): Promise<Order[]>;
  createOrder(tableId: string, items: { product: Product; quantity: number }[]): Promise<Order>;
  updateOrder(order: Order): Promise<void>;
  // For simplicity, we assume we just add items to an existing order or create a new one
  deleteOrdersByTableId(tableId: string): Promise<void>;
}
