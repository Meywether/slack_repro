import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomerEntity } from '../../dtos';

export const GetRole = createParamDecorator((data, context: ExecutionContext): CustomerEntity => {
  const request = context.switchToHttp().getRequest();
  return request.role;
});
