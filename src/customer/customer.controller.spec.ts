import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Transport, ClientProxyFactory, ClientOptions } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        ConfigService,
        JwtService,
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
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
