import { OrderService } from '../../model/services/OrderService';
import { Order } from '../../model/entities/Order';
import { Product } from '../../model/entities/Product';

export class MockOrderService implements OrderService {
  private orders: Order[] = [];

  async getOrdersByTableId(tableId: string): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.orders.filter(o => o.tableId === tableId);
  }

  async createOrder(tableId: string, items: { product: Product; quantity: number }[]): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOrder: Order = {
      id: Math.random().toString(36).substring(7),
      tableId,
      items: items.map(i => ({
        id: Math.random().toString(36).substring(7),
        product: i.product,
        quantity: i.quantity,
      })),
      status: 'pending',
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async updateOrder(order: Order): Promise<void> {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = this.orders.findIndex(o => o.id === order.id);
      if (index !== -1) {
          this.orders[index] = order;
      }
  }

  async deleteOrdersByTableId(tableId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.orders = this.orders.filter(o => o.tableId !== tableId);
  }
}
