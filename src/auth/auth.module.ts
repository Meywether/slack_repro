import { forwardRef, Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerModule } from '../customer/customer.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SlackModule } from 'nestjs-slack';
import { SlackCommService } from '../slack/slack-comm.service';
import { SlackConfig } from 'nestjs-slack/dist/types';

@Module({
  imports: [
    SlackModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        <SlackConfig>{
          type: 'webhook',
          url: configService.get('server.slack_webhook_url'),
        },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('server.jwt_secret'),
        signOptions: { expiresIn: configService.get('server.jwt_expires') },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => CustomerModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SlackCommService, Logger],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
