import { useState } from 'react';
import { useRouter } from 'expo-router';
import { accessCodeUseCase } from '../di';

export function useWelcomeViewModel() {
  const [issuedCode, setIssuedCode] = useState<string>('');
  const [formattedIssued, setFormattedIssued] = useState<string>('');
  const [manualCode, setManualCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const generateCode = async () => {
    setError('');
    setLoading(true);
    try {
      const { code, formatted } = await accessCodeUseCase.issueCode();
      setIssuedCode(code);
      setFormattedIssued(formatted);
    } catch (e: any) {
      setError(e?.message || 'Falha ao gerar código');
    } finally {
      setLoading(false);
    }
  };

  const confirmIssued = async () => {
    if (!issuedCode) return;
    setError('');
    setLoading(true);
    try {
      const ok = await accessCodeUseCase.validateAndUse(issuedCode);
      if (!ok) {
        setError('Código inválido ou já utilizado');
        return;
      }
      router.replace('/login');
    } catch (e: any) {
      setError(e?.message || 'Falha ao confirmar código');
    } finally {
      setLoading(false);
    }
  };

  const confirmManual = async () => {
    setError('');
    setLoading(true);
    try {
      const normalized = manualCode.replace(/\D/g, '').slice(0, 9);
      const ok = await accessCodeUseCase.validateAndUse(normalized);
      if (!ok) {
        setError('Código inválido ou já utilizado');
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
    issuedCode,
    formattedIssued,
    manualCode,
    setManualCode,
    error,
    loading,
    generateCode,
    confirmIssued,
    confirmManual,
    formatPreview,
  };
}
