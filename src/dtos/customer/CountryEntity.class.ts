import { ApiProperty } from '@nestjs/swagger';

export class CountryEntity {
  @ApiProperty({
    example: '1234',
    description: 'UUID of DB entry',
  })
  id: string;
  @ApiProperty({
    example: 'ISO-Code',
    description: '1234',
  })
  countryISOCode: string;
  @ApiProperty({
    example: 'Austria',
    description: 'Austria',
  })
  countryNameEN: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  version: number;
}
