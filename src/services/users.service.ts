import { User } from '../types/auth';
import { ApiError } from './api';

class UserService {
  // Mock database of users
  private users: User[] = [
    {
      id: '1',
      email: 'john@example.com',
      name: 'john_doe',
      password: 'password123' // In real app, this would be hashed
    },
    {
      id: '2',
      email: 'jane@example.com',
      name: 'jane_smith',
      password: 'password456'
    }
  ];

  async validateUser(email: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = this.users.find(u => 
      u.email === email && u.password === password
    );
    
    if (!user) {
      return null;
    }

    // Don't send password back to client
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    if (!user) return null;
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const userService = new UserService();