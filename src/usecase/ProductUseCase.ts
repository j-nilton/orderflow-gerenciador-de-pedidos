import { ProductService } from '../model/services/ProductService';
import { Product } from '../model/entities/Product';

export class ProductUseCase {
  constructor(private productService: ProductService) {}

  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  async addProduct(name: string, price: number): Promise<Product> {
    if (!name) throw new Error('Product name is required');
    if (price <= 0) throw new Error('Price must be greater than zero');
    return this.productService.createProduct(name, price);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
