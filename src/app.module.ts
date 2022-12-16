import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfig } from './config/database.config.service';
import { CustomerModule } from './customer/customer.module';
import { SlackCommModule } from './slack/slack-comm.module';

import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig, serverConfig], cache: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    CustomerModule,
    SlackCommModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
