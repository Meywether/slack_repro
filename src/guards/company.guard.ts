import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      if (!jwt) {
        return false;
      }
      const companyIds = this.jwtService.verify(jwt).companyIds;
      if (!companyIds.includes(request.params.cid) && request.role !== 'Admin') {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      console.log('Error');
      console.log(e);
      return false;
    }
  }
}
