import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerEntity } from '../../dtos';
import { CustomerService } from '../../customer/customer.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private userService: CustomerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('server.jwt_secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<CustomerEntity> {
    const { customerId } = payload;
    const userDB = await this.userService.getUserByID(customerId);
    if (!userDB) {
      throw new UnauthorizedException();
    }
    return userDB;
  }
}
