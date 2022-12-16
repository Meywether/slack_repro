import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomerEntity } from '../../dtos';

export const GetUser = createParamDecorator((data, context: ExecutionContext): CustomerEntity => {
  const request = context.switchToHttp().getRequest();
  // console.log(request.customer);
  return request.customer;
});
