import { Product } from '../entities/Product';

export interface ProductService {
  getProducts(): Promise<Product[]>;
  createProduct(name: string, price: number): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
