import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SlackModule, SlackService } from 'nestjs-slack';
import { SlackConfig } from 'nestjs-slack/dist/types';
import { SlackCommService } from './slack-comm.service';

import databaseConfig from '../config/database.config';
import redisConfig from '../config/redis.config';
import serverConfig from '../config/server.config';
import swaggerConfig from '../config/swagger.config';

describe('SlackService', () => {
  let service: SlackCommService;

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
      providers: [SlackCommService, ConfigService, Logger, SlackService],
    }).compile();

    service = module.get<SlackCommService>(SlackCommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
