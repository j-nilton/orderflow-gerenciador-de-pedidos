import { Table } from '../entities/Table';

export interface TableService {
  createTable(name: string, waiterName?: string): Promise<Table>;
  getTables(): Promise<Table[]>;
  getTableById(id: string): Promise<Table | null>;
  updateTable(table: Table): Promise<void>;
  deleteTable(id: string): Promise<void>;
}
