import { AuthService } from '../model/services/AuthService';
import { User } from '../model/entities/User';

export class AuthUseCase {
  constructor(private authService: AuthService) {}

  async login(email: string): Promise<User> {
    if (!email) throw new Error('Email is required');
    return this.authService.login(email);
  }

  async loginWithEmailPassword(email: string, password: string): Promise<User> {
    if (!email) throw new Error('Email é obrigatório');
    if (!password) throw new Error('Senha é obrigatória');
    return this.authService.loginWithEmailPassword(email, password);
  }

  async registerWithEmail(name: string, email: string, password: string): Promise<User> {
    if (!name) throw new Error('Nome é obrigatório');
    if (!email) throw new Error('Email é obrigatório');
    if (!password) throw new Error('Senha é obrigatória');
    return this.authService.registerWithEmail(name, email, password);
  }

  async loginWithGoogle(): Promise<User> {
    return this.authService.loginWithGoogle();
  }

  async registerWithGoogle(): Promise<User> {
    return this.authService.registerWithGoogle();
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authService.getCurrentUser();
  }
}
