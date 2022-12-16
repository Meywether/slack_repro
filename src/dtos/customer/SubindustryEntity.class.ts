import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IndustryEntity } from './IndustryEntity.class';

export class SubindustryEntity {
  @ApiProperty({
    example: '2626-6565-5865',
    description: 'UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Lebensmitteleinzelhandel',
    description: 'Description in German',
  })
  de: string;

  @ApiProperty({
    example: 'Grocery',
    description: 'Description in English',
  })
  en: string;

  @ApiProperty({
    example: 'input | select',
    description: 'Type of input field',
  })
  type: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  industry: IndustryEntity;
}
