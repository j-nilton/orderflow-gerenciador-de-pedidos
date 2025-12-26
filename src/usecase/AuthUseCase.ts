import { AuthService } from '../model/services/AuthService';
import { User } from '../model/entities/User';

export class AuthUseCase {
  constructor(private authService: AuthService) {}

  async login(email: string): Promise<User> {
    if (!email) throw new Error('Email is required');
    return this.authService.login(email);
  }

  async logout(): Promise<void> {
    return this.authService.logout();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authService.getCurrentUser();
  }
}
