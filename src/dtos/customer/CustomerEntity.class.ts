import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { AddressEntity, CompanyEntity, IndustryEntity, RoleEntity, SubindustryEntity } from '..';
import { Languages } from '../../enums/Languages.enum';

export class CustomerEntity {
  @ApiProperty({
    example: '1231',
    description: 'An uuid of a customer ',
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty({
    example: '123@example.at',
    description: 'An email address, which needs to be unique',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Armin',
    description: 'The used username of the user',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: '0000asdasd00a0',
    description: 'only required if email gets changed',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Churchbutton',
    description: 'a last name ',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '066473846988',
    description: 'a phone number ',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'Enum language',
    description: 'Currently only de',
  })
  @IsNotEmpty()
  @IsEnum(Languages)
  language: string;

  @ApiProperty({
    example: 'UID',
    description: 'AUT / UID Nummer ',
  })
  @IsNotEmpty()
  @IsString()
  taxNumber: string;

  @ApiProperty({
    example: 'IndustryEntity',
    description: 'IndustryEntity',
    type: () => IndustryEntity,
  })
  @IsNotEmpty()
  @IsString()
  industry: IndustryEntity;

  @ApiProperty({
    example: 'SubindustryEntity | null',
    description: 'SubindustryEntity',
    type: () => SubindustryEntity,
  })
  @IsNotEmpty()
  @IsString()
  subindustry: SubindustryEntity | null;

  @ApiProperty({
    example: 'true | false',
    description: 'checks if the user is active',
  })
  isActive: boolean;

  @Exclude()
  salt: string;

  @Exclude()
  password: string;

  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  version: number;

  @ApiProperty({
    example: 'An Role Entity ',
    description: 'An Role Entity',
    type: () => RoleEntity,
  })
  role: RoleEntity;

  @ApiProperty({
    example: 'An Address Entity ',
    description: 'An Address Entity',
    type: () => AddressEntity,
  })
  address: AddressEntity;

  @ApiProperty({
    example: 'An array of company entities',
    description: 'an array of company entities',
    type: [CompanyEntity],
  })
  companies: CompanyEntity[];
}
