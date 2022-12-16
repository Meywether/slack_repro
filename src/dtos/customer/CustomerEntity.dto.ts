import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Languages } from '../../enums/Languages.enum';

export class CustomerEntityDto {
  @ApiProperty({
    example: '123',
    description: 'a uuid of a valid user',
  })
  @IsNotEmpty()
  @IsString()
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
    example: 'UUID',
    description: 'industry entity id',
  })
  @IsNotEmpty()
  @IsString()
  industry_id: string;

  @ApiProperty({
    example: 'subindustry entity id',
    description: 'must not be set if industry id "other"',
    required: false,
  })
  subindustry_id: string | null;

  @ApiHideProperty()
  password: string;

  @ApiHideProperty()
  emailActivationToken: string;

  @ApiHideProperty()
  ip: string;

  @ApiHideProperty()
  isActive: boolean;
}
