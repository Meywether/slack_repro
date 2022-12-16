import { forwardRef, Logger, Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisOptions, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('server.jwt_secret'),
        signOptions: { expiresIn: configService.get('server.jwt_expires') },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CustomerController],
  providers: [
    Logger,
    CustomerService,
    {
      provide: 'USER_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        const options = <RedisOptions>{
          transport: Transport.REDIS,
          options: {
            host: configService.get('redis.redis_host'),
            port: configService.get('redis.redis_port'),
            password: configService.get('redis.redis_password'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: 'EMAIL_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        const options = <RedisOptions>{
          transport: Transport.REDIS,
          options: {
            host: configService.get('redis.redis_host'),
            port: configService.get('redis.redis_port'),
            password: configService.get('redis.redis_password'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    {
      provide: 'SETTINGS_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        const options = <RedisOptions>{
          transport: Transport.REDIS,
          options: {
            host: configService.get('redis.redis_host'),
            port: configService.get('redis.redis_port'),
            password: configService.get('redis.redis_password'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],

  exports: [CustomerService],
})
export class CustomerModule {}
