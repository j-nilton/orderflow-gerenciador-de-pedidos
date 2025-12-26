import { OrderService } from '../model/services/OrderService';
import { TableService } from '../model/services/TableService';
import { Order } from '../model/entities/Order';
import { Product } from '../model/entities/Product';

export class OrderUseCase {
  constructor(private orderService: OrderService, private tableService?: TableService) {}

  async getOrders(tableId: string): Promise<Order[]> {
    return this.orderService.getOrdersByTableId(tableId);
  }

  async addOrder(tableId: string, productName: string, price: number, quantity: number = 1): Promise<Order> {
    const product: Product = {
      id: Math.random().toString(36).substring(7), // Mock ID
      name: productName,
      price: price,
    };
    
    // In a real app, we might check if there's an open order for this table and append to it.
    // For now, we just create a new order entry for every "add".
    const created = await this.orderService.createOrder(tableId, [{ product, quantity }]);
    
    if (this.tableService) {
      const table = await this.tableService.getTableById(tableId);
      if (table && !table.isOccupied) {
        table.isOccupied = true;
        await this.tableService.updateTable(table);
      }
    }
    
    return created;
  }

  async updateOrderItem(tableId: string, orderId: string, itemId: string, quantity: number): Promise<void> {
    const orders = await this.orderService.getOrdersByTableId(tableId);
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const itemIndex = order.items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        order.items.splice(itemIndex, 1);
      } else {
        order.items[itemIndex].quantity = quantity;
      }
      
      // If order has no items, we could delete it, but for now let's keep it or handle it in service
      await this.orderService.updateOrder(order);
    }
  }

  async removeOrderItem(tableId: string, orderId: string, itemId: string): Promise<void> {
    const orders = await this.orderService.getOrdersByTableId(tableId);
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const itemIndex = order.items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      order.items.splice(itemIndex, 1);
      await this.orderService.updateOrder(order);
    }
  }
}
