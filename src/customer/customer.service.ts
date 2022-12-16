import { Inject, Injectable, Logger, LoggerService, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
import { CustomerEntity, CustomerPaginationDTO, LoginDTO, PaginationDto } from '../dtos';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('USER_MICROSERVICE')
    private customerAndCompanyClient: ClientProxy,
    @Inject(Logger)
    private readonly logger: LoggerService, // @Inject(forwardRef(() => AuthService)) private authService: AuthService, // for later, before i forget the syntax
  ) {}

  public async getAllUsers(paginationDto: PaginationDto): Promise<CustomerPaginationDTO> {
    this.logger.log(`UserService - getAllUsers`);
    try {
      return await lastValueFrom(this.customerAndCompanyClient.send<CustomerPaginationDTO, PaginationDto>('getAllUsers', paginationDto).pipe(timeout(10000)));
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new RequestTimeoutException();
      }
    }
  }

  public async getUserByID(id: string): Promise<CustomerEntity> {
    this.logger.log(`UserService - getUserByID - ${JSON.stringify(id)}`);
    try {
      return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, string>('getUserByID', id).pipe(timeout(10000)));
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new RequestTimeoutException();
      }
    }
  }

  public async getUserByEmail(email: string): Promise<CustomerEntity> {
    this.logger.log(`UserService - getUserByEmail - ${JSON.stringify(email)}`);
    try {
      return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, string>('getUserByEmail', email).pipe(timeout(10000)));
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new RequestTimeoutException();
      }
    }
  }

  public async getUserForLogin(loginDto: LoginDTO): Promise<CustomerEntity> {
    // no stringify here - we wont ever log passwords ... never ever
    this.logger.log(`UserService - getUserForLogin for email: ${loginDto.email}`);
    try {
      return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, LoginDTO>('getUserForLoginFromAPI', loginDto).pipe(timeout(10000)));
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new RequestTimeoutException();
      }
    }
  }
  /**
   *
   * Currenty not used code but logic is to 80% for later usefull
   *
   */

  // public async updateUser(userEntityDto: CustomerEntityDto, isEmailActivated = false, isActivatingAccount = false): Promise<CustomerEntity> {
  //   this.logger.log(`UserService - updateUser`);
  //   // check if entites of country, industry and subindustry exists else 400
  //   // General Sanitation:
  //   if (!isActivatingAccount) {
  //     await this.userUtilityService.validateEntities(userEntityDto);
  //   }
  //   const dbUser = await this.getUserByID(userEntityDto.id);
  //   if (userEntityDto.email !== dbUser.email && !isEmailActivated) {
  //     // check password
  //     const loginDto = new LoginDTO();
  //     loginDto.email = dbUser.email; // The email of the dto is changed -> but for the validation the old one is needed
  //     loginDto.password = userEntityDto.password;
  //     loginDto.userOnly = true;
  //     const newUser = await this.getUserForLogin(loginDto);
  //     if (!newUser) {
  //       // Wrong password
  //       throw new BadRequestException('User not found or password incorrect');
  //     }

  //     // password valid
  //     const mail = new ActivateMailEntity();
  //     mail.to = [userEntityDto.email, dbUser.email]; // immer zuerst new email dann old email
  //     const token = await this.authService.generateEmailActivationToken(userEntityDto, dbUser.email);
  //     userEntityDto.email = dbUser.email;
  //     mail.mailActivationToken = token.emailActivationToken;
  //     mail.ip = userEntityDto.ip;
  //     mail.username = userEntityDto.username;
  //     const res = await lastValueFrom(this.mailClient.send<ResponseDto, ActivateMailEntity>('sendActivateEmail', mail));
  //     if (res.statusCode === 201) {
  //       // delete Password:
  //       delete userEntityDto.password;
  //       return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, CustomerEntityDto>('updateUser', userEntityDto));
  //     } else {
  //       this.logger.error(`UserService - updateUser, error in mail send: ${res.error} `);
  //       throw new InternalServerErrorException(res.error);
  //     }
  //   }
  //   if (isEmailActivated) {
  //     // send success Email
  //     const mail = new ActivateMailEntity();
  //     mail.to = [userEntityDto.email, dbUser.email];
  //     mail.ip = userEntityDto.ip;
  //     const res = await lastValueFrom(this.mailClient.send<ResponseDto, ActivateMailEntity>('sendActivateEmailSuccess', mail));
  //     if (res.statusCode === 201) {
  //       // delete Password:
  //       delete userEntityDto.password;
  //       return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, CustomerEntityDto>('updateUser', userEntityDto));
  //     } else {
  //       this.logger.error(`UserService - updateUser, error in mail send: ${res.error} `);
  //       throw new InternalServerErrorException(res.error);
  //     }
  //   }
  //   if (isActivatingAccount) {
  //     // then convert entitydto to entity
  //     const entity = new CustomerEntityDto();
  //     entity.email = userEntityDto.email;
  //     entity.username = userEntityDto.username;
  //     entity.subindustry_id = userEntityDto.subindustry_id;
  //     entity.industry_id = userEntityDto.industry_id;
  //     entity.username = userEntityDto.username;
  //     entity.firstName = userEntityDto.firstName;
  //     entity.lastName = userEntityDto.lastName;
  //     entity.phoneNumber = userEntityDto.phoneNumber;
  //     entity.language = userEntityDto.language;
  //     entity.taxNumber = userEntityDto.taxNumber;
  //     entity.isActive = true;
  //   }
  //   // default -> update user
  //   // delete Password:
  //   delete userEntityDto.password;
  //   return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, CustomerEntityDto>('updateUser', userEntityDto));
  // }

  // public async updatePassword(passwordResetDTO: PasswordResetDto): Promise<CustomerEntity> {
  //   this.logger.log(`UserService - updatePassword`);
  //   return await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntity, PasswordResetDto>('updatePassword', passwordResetDTO));
  // }

  // public async registerNewUser(userDto: CustomerRegistrationDTO): Promise<void> {
  //   this.logger.log(`UserService - registerNewUser`);
  //   let user: CustomerEntityDto;
  //   try {
  //     user = await lastValueFrom(this.customerAndCompanyClient.send<CustomerEntityDto, CustomerRegistrationDTO>('registerNewUser', userDto));
  //   } catch (error) {
  //     throw new ConflictException('Email already exists');
  //   }
  //   // Email stuff
  //   const token = await this.authService.generateAccountActivationToken(user);
  //   const mail = new ActivateAccountEntity();
  //   mail.to = user.email;
  //   mail.accountActivationToken = token.accountActivationToken;
  //   const res = await lastValueFrom(this.mailClient.send<ResponseDto, ActivateAccountEntity>('sendActivateAccountEmail', mail));
  //   return;
  // }
}
