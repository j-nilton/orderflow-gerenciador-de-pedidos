import { ProductService } from '../../model/services/ProductService';
import { Product } from '../../model/entities/Product';

export class MockProductService implements ProductService {
  private products: Product[] = [
    { id: '1', name: 'Coca-Cola', price: 5.0 },
    { id: '2', name: 'X-Tudo', price: 25.0 },
    { id: '3', name: 'Água Mineral', price: 3.0 },
  ];

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.products];
  }

  async createProduct(name: string, price: number): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      name,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.products = this.products.filter(p => p.id !== id);
  }
}
