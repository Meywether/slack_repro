import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { SlackCommService } from '../slack/slack-comm.service';
import { CustomerService } from '../customer/customer.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory, ClientOptions } from '@nestjs/microservices';
import { SlackModule, SlackService } from 'nestjs-slack';
import { SlackConfig } from 'nestjs-slack/dist/types';

import databaseConfig from '../config/database.config';
import redisConfig from '../config/redis.config';
import serverConfig from '../config/server.config';
import swaggerConfig from '../config/swagger.config';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, redisConfig, serverConfig, swaggerConfig], cache: true }),
        SlackModule.forRootAsync({
          useFactory: (configService: ConfigService) =>
            <SlackConfig>{
              type: 'webhook',
              url: configService.get('server.slack_webhook_url'),
            },
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        ConfigService,
        CustomerService,
        JwtService,
        SlackService,
        SlackCommService,
        Logger,
        {
          provide: 'USER_MICROSERVICE',
          useFactory: (configService: ConfigService) => {
            const options = <ClientOptions>{
              transport: Transport.REDIS,
              options: {
                host: configService.get('redis_host'),
                port: configService.get('redis_port'),
                password: configService.get('redis_password'),
              },
            };
            return ClientProxyFactory.create(options);
          },
          inject: [ConfigService],
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
