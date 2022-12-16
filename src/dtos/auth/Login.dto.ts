import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'test@xxx.at',
    description: 'The provided email address for accessing the api',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123ABCDE',
    description: 'The provided password for accessing the api',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiHideProperty()
  ip: string;
}
