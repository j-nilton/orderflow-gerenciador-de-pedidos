import { User } from '../entities/User';

export interface AuthService {
  login(email: string): Promise<User>;
  loginWithEmailPassword(email: string, password: string): Promise<User>;
  registerWithEmail(name: string, email: string, password: string): Promise<User>;
  loginWithGoogle(): Promise<User>;
  registerWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
