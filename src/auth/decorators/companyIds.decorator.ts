import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomerEntity } from '../../dtos';

export const GetCompanyIds = createParamDecorator((data, context: ExecutionContext): CustomerEntity => {
  const request = context.switchToHttp().getRequest();
  return request.companyIds;
});
