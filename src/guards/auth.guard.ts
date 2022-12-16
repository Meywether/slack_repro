import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: CustomerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearer: string = request.headers.authorization;
      if (!bearer) {
        return false;
      }
      const jwt = bearer.split(' ')[1];
      if (!jwt) return false;

      const customerId = this.jwtService.verify(jwt).customerId;
      const userDB = await this.userService.getUserByID(customerId);
      request.role = userDB.role.name;
      request.customer = userDB;
      request.companyIds = this.jwtService.verify(jwt).companyIds;

      if (this.jwtService.verify(jwt)) {
        // console.log(this.jwtService.verify(jwt));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('Error');
      console.log(e);
      return false;
    }
  }
}
