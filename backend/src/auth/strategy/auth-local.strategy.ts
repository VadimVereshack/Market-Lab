import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SessionUser, Role } from '../types';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<SessionUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const roles = user.roles as Role[];
    let name: string | undefined;

    if (roles.includes('customer') && user.customerProfile) {
      name = `${user.customerProfile.firstName} ${user.customerProfile.lastName}`.trim();
    } else if (roles.includes('supplier') && user.supplierProfile) {
      name = user.supplierProfile.companyName;
    } else if (roles.includes('admin')) {
      name = 'Administrator';
    }

    return {
      id: user.id,
      email: user.email,
      roles: roles,
      name: name,
    };
  }
}