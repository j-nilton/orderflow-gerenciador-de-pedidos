import { TableService } from '../model/services/TableService';
import { OrderService } from '../model/services/OrderService';
import { AuthService } from '../model/services/AuthService';
import { Table } from '../model/entities/Table';

export class TableUseCase {
  constructor(private tableService: TableService, private orderService?: OrderService, private authService?: AuthService) {}

  async createTable(name: string): Promise<Table> {
    if (!name) throw new Error('Table name is required');
    let waiterName: string | undefined = undefined;
    if (this.authService) {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('Sessão inválida. Faça login novamente.');
      waiterName = user.name;
    }
    return this.tableService.createTable(name, waiterName);
  }

  async getTables(): Promise<Table[]> {
    return this.tableService.getTables();
  }

  async getTableById(id: string): Promise<Table | null> {
    return this.tableService.getTableById(id);
  }

  async updateNotes(tableId: string, notes: string): Promise<void> {
    const table = await this.tableService.getTableById(tableId);
    if (!table) throw new Error('Table not found');
    table.notes = notes;
    if (notes && notes.trim().length > 0) {
      table.isOccupied = true;
    }
    await this.tableService.updateTable(table);
  }

  async deleteTable(id: string): Promise<void> {
    return this.tableService.deleteTable(id);
  }

  async clearTable(tableId: string): Promise<void> {
    const table = await this.tableService.getTableById(tableId);
    if (!table) throw new Error('Table not found');
    table.isOccupied = false;
    table.notes = '';
    await this.tableService.updateTable(table);
    if (this.orderService) {
      await this.orderService.deleteOrdersByTableId(tableId);
    }
  }
}
