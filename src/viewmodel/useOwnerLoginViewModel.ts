import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authUseCase } from '../di';

export function useOwnerLoginViewModel() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      setLoading(true);
      setError('');
      await authUseCase.login(name);
      router.replace('/owner-code');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    loading,
    error,
    login,
  };
}
