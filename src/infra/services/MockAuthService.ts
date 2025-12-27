import { AuthService } from '../../model/services/AuthService';
import { User } from '../../model/entities/User';
import * as SecureStore from 'expo-secure-store';

export class MockAuthService implements AuthService {
  private currentUser: User | null = null;
  private users = new Map<string, { user: User; password?: string; nameLocked: boolean }>();
  private static KEY = 'orderflow_current_user';

  private async persistUser(user: User | null) {
    this.currentUser = user;
    if (user) {
      await SecureStore.setItemAsync(MockAuthService.KEY, JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync(MockAuthService.KEY);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) return this.currentUser;
    const raw = await SecureStore.getItemAsync(MockAuthService.KEY);
    if (raw) {
      this.currentUser = JSON.parse(raw);
    }
    return this.currentUser;
  }

  async login(email: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Treat provided string as the user's name for simplicity in this demo.
    const user = { id: Math.random().toString(36).substring(7), name: email, email: '' };
    await this.persistUser(user);
    return user;
  }

  async loginWithEmailPassword(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const record = this.users.get(email);
    if (!record || record.password !== password) {
      throw new Error('Email ou senha inválidos');
    }
    await this.persistUser(record.user);
    return record.user;
  }

  async registerWithEmail(name: string, email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (this.users.has(email)) {
      throw new Error('Email já cadastrado');
    }
    const user: User = { id: Math.random().toString(36).substring(7), name, email };
    this.users.set(email, { user, password, nameLocked: true });
    await this.persistUser(user);
    return user;
  }

  async loginWithGoogle(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 400));
    // Mock Google identity
    const email = 'usuario.google@orderflow.local';
    const name = 'Usuário Google';
    const record = this.users.get(email);
    if (record) {
      await this.persistUser(record.user);
      return record.user;
    } else {
      const user: User = { id: Math.random().toString(36).substring(7), name, email };
      this.users.set(email, { user, nameLocked: true });
      await this.persistUser(user);
      return user;
    }
  }

  async registerWithGoogle(): Promise<User> {
    // In this mock, registerWithGoogle behaves like loginWithGoogle, creating the user if absent.
    return this.loginWithGoogle();
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.persistUser(null);
  }
}
