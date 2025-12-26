import { useState } from 'react';
import { useRouter } from 'expo-router';
import { tableUseCase } from '../di';

export function useCreateTableViewModel() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const createTable = async () => {
    try {
      setLoading(true);
      setError('');
      await tableUseCase.createTable(name);
      router.back();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    router.back();
  };

  return {
    name,
    setName,
    loading,
    error,
    createTable,
    cancel,
  };
}
