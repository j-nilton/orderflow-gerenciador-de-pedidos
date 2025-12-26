import { useEffect, useState } from 'react';
import { accessCodeUseCase } from '../di';

export function useOwnerCodeViewModel() {
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [formattedActive, setFormattedActive] = useState<string | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [formattedPending, setFormattedPending] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [canGenerate, setCanGenerate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  const load = async () => {
    setLoading(true);
    const data = await accessCodeUseCase.getOwnerState();
    setActiveCode(data.activeCode);
    setFormattedActive(data.formattedActive);
    setPendingCode(data.pendingCode);
    setFormattedPending(data.formattedPending);
    setConfirmed(data.confirmed);
    setCanGenerate(data.canGenerate);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const generate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    const { code, formatted } = await accessCodeUseCase.generateOwnerCode();
    setPendingCode(code);
    setFormattedPending(formatted);
    setConfirmed(false);
    setCanGenerate(false);
    setFeedback('Código gerado');
    setLoading(false);
  };

  const confirm = async () => {
    setLoading(true);
    await accessCodeUseCase.confirmOwnerCode();
    await load();
    setFeedback('Código confirmado');
    setLoading(false);
  };

  const reset = async () => {
    setLoading(true);
    await accessCodeUseCase.resetOwnerCode();
    await load();
    setFeedback('Redefinição liberada. Gere um novo código.');
    setLoading(false);
  };

  return {
    activeCode,
    formattedActive,
    pendingCode,
    formattedPending,
    confirmed,
    loading,
    feedback,
    canGenerate,
    generate,
    confirm,
    reset,
    reload: load,
  };
}
