import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { tableUseCase, orderUseCase, authUseCase, productUseCase } from '../di';
import { Table } from '../model/entities/Table';
import { Order } from '../model/entities/Order';
import { Product } from '../model/entities/Product';

export function useTableDetailsViewModel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [table, setTable] = useState<Table | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [waiterName, setWaiterName] = useState('');
  
  // Available Products
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (tableId: string) => {
    setLoading(true);
    try {
        const [t, o, user, p] = await Promise.all([
            tableUseCase.getTableById(tableId),
            orderUseCase.getOrders(tableId),
            authUseCase.getCurrentUser(),
            productUseCase.getProducts()
        ]);
        
        setTable(t);
        setNotes(t?.notes || '');
        setOrders(o);
        setWaiterName(user?.name || 'Unknown');
        setProducts(p);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const saveNotes = async () => {
    if (table && id) {
        if (notes.trim().length > 0 && !table.isOccupied) {
          setTable({ ...table, isOccupied: true, notes });
        } else {
          setTable({ ...table, notes });
        }
        await tableUseCase.updateNotes(id, notes);
        const t = await tableUseCase.getTableById(id);
        setTable(t);
    }
  };
  
  const deleteTable = async () => {
      if (id) {
          await tableUseCase.deleteTable(id);
          router.back();
      }
  };

  const addOrder = async (product: Product, quantity: number) => {
    if (!id || !product) return;
    try {
        await orderUseCase.addOrder(id, product.name, product.price, quantity);
        // Refresh orders
        const o = await orderUseCase.getOrders(id);
        setOrders(o);
    } catch (e) {
        console.error(e);
    }
  };

  const updateOrderItem = async (orderId: string, itemId: string, newQuantity: number) => {
    if (!id) return;
    try {
        await orderUseCase.updateOrderItem(id, orderId, itemId, newQuantity);
        const o = await orderUseCase.getOrders(id);
        setOrders(o);
    } catch (e) {
        console.error(e);
    }
  };

  const removeOrderItem = async (orderId: string, itemId: string) => {
    if (!id) return;
    try {
        await orderUseCase.removeOrderItem(id, orderId, itemId);
        const o = await orderUseCase.getOrders(id);
        setOrders(o);
    } catch (e) {
        console.error(e);
    }
  };

  const clearTable = async () => {
    if (!id) return;
    try {
      await tableUseCase.clearTable(id);
      const [t, o] = await Promise.all([
        tableUseCase.getTableById(id),
        orderUseCase.getOrders(id),
      ]);
      setTable(t);
      setNotes(t?.notes || '');
      setOrders(o);
    } catch (e) {
      console.error(e);
    }
  };

  const totalAmount = orders.reduce((total, order) => {
    return total + order.items.reduce((subTotal, item) => {
      return subTotal + (item.product.price * item.quantity);
    }, 0);
  }, 0);

  return {
    table,
    orders,
    loading,
    notes,
    setNotes,
    waiterName,
    saveNotes,
    deleteTable,
    products,
    selectedProduct,
    setSelectedProduct,
    addOrder,
    updateOrderItem,
    removeOrderItem,
    totalAmount,
    clearTable,
  };
}
