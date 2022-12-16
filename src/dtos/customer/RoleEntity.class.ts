import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RoleEntity {
  @ApiProperty({
    example: 'Id  of the Role Entity ',
  })
  id: string;

  @ApiProperty({
    example: 'The Name of the role e.g. Admin or User',
    description: 'An Role Entity',
  })
  name: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  version: number;
}
