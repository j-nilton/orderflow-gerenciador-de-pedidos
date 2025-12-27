import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authUseCase } from '../di';

export function useAuthLoginViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const loginEmail = async () => {
    try {
      setLoading(true);
      setError('');
      await authUseCase.loginWithEmailPassword(email.trim(), password);
      router.replace('/profile-select');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      await authUseCase.loginWithGoogle();
      router.replace('/profile-select');
    } catch (e: any) {
      setError(e.message || 'Falha no login com Google');
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    router.push('/register');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    loginEmail,
    loginGoogle,
    goToRegister,
  };
}
