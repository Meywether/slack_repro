import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SlackService } from 'nestjs-slack';

@Injectable()
export class SlackCommService {
  constructor(private readonly configService: ConfigService, private readonly slackService: SlackService, @Inject(Logger) private readonly logger: LoggerService) {}

  public sendMessage(msg: string): void {
    this.logger.log(`SlackCommService - sendMessage for System: ${this.configService.get('server_mode')} triggered`);
    switch (this.configService.get('server_mode')) {
      case 'PROD':
        this.sendMessageToSlack(msg, 'Production');
        break;
      case 'DEV':
        this.sendMessageToSlack(msg, 'Staging');
        break;
      case 'DEV_LOCAL':
        this.logger.log(msg);
    }
  }

  private sendMessageToSlack(msg: string, system: string): void {
    this.slackService.sendText(`${system} ${msg}`);
  }
}
