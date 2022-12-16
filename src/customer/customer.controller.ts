import { CacheTTL, ClassSerializerInterceptor, Get, Inject, Logger, LoggerService, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiForbiddenResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../auth/decorators/roles.meta.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { CustomerService } from './customer.service';
import { CustomerEntity } from '../dtos';

@ApiTags('Customer')
@ApiHeader({
  name: 'Authorization',
  description: 'Required field in header for Bearer-Token-Authorization, example: "bearer 1234asdf"',
  example: { Authorization: 'bearer 1234asdf' },
  required: true,
})
@UseInterceptors(ClassSerializerInterceptor)
@Controller('customer')
export class CustomerController {
  constructor(private userService: CustomerService, @Inject(Logger) private readonly logger: LoggerService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Get Customer by given Bearer Token' })
  @ApiOkResponse({ description: 'Get Customer successfully', type: CustomerEntity })
  @ApiUnauthorizedResponse({ description: 'Customer requested different ID, which is not allowed if role is not admin' })
  @ApiForbiddenResponse({ description: 'Not authenticated or jwt invalid or Authorization Header not set' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'User')
  @CacheTTL(1)
  protected async getUserByCookie(@GetUser() user: CustomerEntity): Promise<CustomerEntity> {
    let userDB = null;
    userDB = await this.userService.getUserByID(user.id);
    return userDB;
  }
}
