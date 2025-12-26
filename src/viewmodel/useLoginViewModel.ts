import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authUseCase } from '../di';

export function useLoginViewModel() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      setLoading(true);
      setError('');
      await authUseCase.login(email);
      router.replace('/dashboard');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    login,
  };
}
