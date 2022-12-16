import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SlackModule } from 'nestjs-slack';
import { SlackConfig } from 'nestjs-slack/dist/types';
import { SlackCommService } from './slack-comm.service';

@Module({
  imports: [
    SlackModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        <SlackConfig>{
          type: 'webhook',
          url: configService.get('slack_webhook_url'),
        },
      inject: [ConfigService],
    }),
  ],
  providers: [SlackCommService, Logger],
})
export class SlackCommModule {}
