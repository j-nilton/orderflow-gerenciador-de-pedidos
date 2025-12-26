import { User } from '../entities/User';

export interface AuthService {
  login(email: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
