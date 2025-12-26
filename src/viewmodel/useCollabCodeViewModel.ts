import { useState } from 'react';
import { useRouter } from 'expo-router';
import { accessCodeUseCase } from '../di';

export function useCollabCodeViewModel() {
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const confirmManual = async () => {
    setError('');
    setLoading(true);
    try {
      const normalized = manualCode.replace(/\D/g, '').slice(0, 9);
      const ok = await accessCodeUseCase.validateAndUse(normalized);
      if (!ok) {
        setError('Código inválido ou não confirmado');
        return;
      }
      router.replace('/login');
    } catch (e: any) {
      setError(e?.message || 'Falha ao confirmar código');
    } finally {
      setLoading(false);
    }
  };

  const formatPreview = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 9);
    return accessCodeUseCase.format(digits);
  };

  return {
    manualCode,
    setManualCode,
    error,
    loading,
    confirmManual,
    formatPreview,
  };
}
