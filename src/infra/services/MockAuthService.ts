import { AuthService } from '../../model/services/AuthService';
import { User } from '../../model/entities/User';

export class MockAuthService implements AuthService {
  private currentUser: User | null = null;

  async login(email: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Treat provided string as the user's name for simplicity in this demo.
    this.currentUser = { id: Math.random().toString(36).substring(7), name: email, email: '' };
    return this.currentUser;
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }
}
