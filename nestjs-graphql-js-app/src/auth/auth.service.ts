import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  // Simple in-memory storage
  private users: User[] = [];

  constructor(private jwtService: JwtService) {} // Injecting JwtService to handle JWT operations

  async register(username: string, password: string): Promise<User> {
    // Check if user exists
    if (this.users.find(user => user.username === username)) {
      throw new UnauthorizedException('Username already exists');
    }

    // Create new user (in a real app, you'd hash the password)
    const user: User = { username, password };
    this.users.push(user);
    return user;
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    // Find user
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const token = this.jwtService.sign({ username: user.username });
    return { token };
  }

  validateToken(token: string): User | null { 
    try {
      const decoded = this.jwtService.verify(token);
      const user = this.users.find(u => u.username === decoded.username);
      return user || null;
    } catch {
      return null;
    }
  }
} 