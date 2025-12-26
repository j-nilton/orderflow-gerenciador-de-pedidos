import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { productUseCase } from '../di';
import { Product } from '../model/entities/Product';

export function useProductsViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productUseCase.getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  const addProduct = async () => {
    try {
      if (!name || !price) return;
      setLoading(true);
      await productUseCase.addProduct(name, parseFloat(price));
      setName('');
      setPrice('');
      await fetchProducts();
    } catch (e) {
      console.error(e);
      alert('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await productUseCase.deleteProduct(id);
      await fetchProducts();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    name,
    setName,
    price,
    setPrice,
    addProduct,
    deleteProduct,
  };
}
