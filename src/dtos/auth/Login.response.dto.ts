import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    example: '1234ABCDEF',
    description: 'Returns the jwt of the user, if login was successfull',
    type: String,
  })
  jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }
}
