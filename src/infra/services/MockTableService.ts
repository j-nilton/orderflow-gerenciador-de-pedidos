import { TableService } from '../../model/services/TableService';
import { Table } from '../../model/entities/Table';

export class MockTableService implements TableService {
  private tables: Table[] = [];

  async createTable(name: string, waiterName?: string): Promise<Table> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTable: Table = {
      id: Math.random().toString(36).substring(7),
      name,
      isOccupied: false,
      waiterName,
    };
    this.tables.push(newTable);
    return newTable;
  }

  async getTables(): Promise<Table[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.tables];
  }

  async getTableById(id: string): Promise<Table | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.tables.find(t => t.id === id) || null;
  }

  async updateTable(table: Table): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.tables.findIndex(t => t.id === table.id);
    if (index !== -1) {
      this.tables[index] = table;
    }
  }

  async deleteTable(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.tables = this.tables.filter(t => t.id !== id);
  }
}
