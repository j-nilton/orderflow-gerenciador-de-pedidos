import { Product } from './Product';

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
}
