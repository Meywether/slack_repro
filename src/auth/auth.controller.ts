import { Body, Controller, Inject, Logger, LoggerService, Post, Res, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorDTO, LoginDTO } from '../dtos';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, @Inject(Logger) private readonly logger: LoggerService) {}

  @Post('/login')
  protected async login(@Body(ValidationPipe) loginDTO: LoginDTO): Promise<Boolean | ErrorDTO> {
    return await this.authService.login(loginDTO);
  }

  @Post('/logout')
  protected async logout(@Res({ passthrough: true }) response: Response): Promise<boolean> {
    return this.authService.logout(response);
  }
}
