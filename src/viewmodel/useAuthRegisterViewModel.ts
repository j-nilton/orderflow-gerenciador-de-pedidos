import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authUseCase } from '../di';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useAuthRegisterViewModel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const registerEmail = async () => {
    try {
      setLoading(true);
      setError('');
      if (!isValidEmail(email.trim())) {
        throw new Error('Email inválido');
      }
      if (password !== confirm) {
        throw new Error('Senha e confirmação devem ser iguais');
      }
      await authUseCase.registerWithEmail(name.trim(), email.trim(), password);
      router.replace('/profile-select');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const registerGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await authUseCase.registerWithGoogle();
      setName(user.name);
      setEmail(user.email);
      router.replace('/profile-select');
    } catch (e: any) {
      setError(e.message || 'Falha no cadastro com Google');
    } finally {
      setLoading(false);
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    showPassword, setShowPassword,
    loading, error,
    registerEmail,
    registerGoogle,
  };
}
