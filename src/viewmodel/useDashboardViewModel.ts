import { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { tableUseCase } from '../di';
import { Table } from '../model/entities/Table';

export function useDashboardViewModel() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchTables = useCallback(async () => {
    try {
      setLoading(true);
      const data = await tableUseCase.getTables();
      setTables(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTables();
    }, [fetchTables])
  );

  const filteredTables = tables.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToCreate = () => {
    router.push('/create-table');
  };

  const navigateToDetails = (id: string) => {
    router.push(`/table/${id}`);
  };

  const navigateToProducts = () => {
    router.push('/products');
  };

  return {
    tables: filteredTables,
    loading,
    searchQuery,
    setSearchQuery,
    refresh: fetchTables,
    navigateToCreate,
    navigateToDetails,
    navigateToProducts,
  };
}
