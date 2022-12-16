import { forwardRef, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CustomerService } from '../customer/customer.service';
import { SlackCommService } from '../slack/slack-comm.service';
import { ErrorDTO, LoginDTO, LoginResponseDTO } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => CustomerService)) private userService: CustomerService,
    private JWTService: JwtService,
    private slackCommService: SlackCommService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  public async login(loginDTO: LoginDTO): Promise<Boolean | ErrorDTO> {
    this.slackCommService.sendMessage(`:white_check_mark: SUCCESSFULL - API GATEWAY - new Login: Username: ${loginDTO.email} from ip: ${loginDTO.ip}`);
    return true;
  }

  public async logout(response: Response): Promise<boolean> {
    // Delete HTTP Only Cookie, which cannot be accessed by JS on Frontend
    response.cookie('jwt', '', { httpOnly: true, sameSite: 'none', secure: true, expires: new Date(0) });
    return true;
  }
}
