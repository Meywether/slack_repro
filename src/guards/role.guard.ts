import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: CustomerService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles_can_activate = this.reflector.get<string>('roles', context.getHandler());
    if (!roles_can_activate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    let userid = request.userid;

    if (userid == null) {
      try {
        const bearer: string = request.headers.authorization;
        if (!bearer) {
          return false;
        }
        const jwt = bearer.split(' ')[1];
        if (!jwt) return false;
        const id = this.jwtService.verify(jwt).customerId;
        userid = id;
      } catch (e) {
        return false;
      }
    }
    if (!userid) {
      return false;
    }

    const user = await this.userService.getUserByID(userid);
    return roles_can_activate.includes(user.role.name);
  }
}
