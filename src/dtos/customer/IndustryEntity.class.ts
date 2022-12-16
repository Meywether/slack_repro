import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { SubindustryEntity } from './SubindustryEntity.class';

export class IndustryEntity {
  @ApiProperty({
    example: '2626-6565-5865',
    description: 'UUID',
  })
  id: string;

  @ApiProperty({
    example: 'Produktion',
    description: 'Beschreibung in Deutsch',
  })
  de: string;

  @ApiProperty({
    example: 'Production',
    description: 'Beschreibung in English',
  })
  en: string;

  @ApiProperty({
    example: 'xxxx',
    description: 'ImageURL',
  })
  imageURL: string;

  @ApiProperty({
    example: 'true or false',
    description: 'Tells the frontend if the DB entry has to be shown or not',
  })
  isDefault: boolean;

  @ApiProperty({
    example: 'select | input',
    description: 'Tells the frontend if the type is and select or input field',
  })
  type: string;

  @ApiProperty({
    example: '1',
    description: 'Tells the frontend how to sort the fields, if not presorted by the backend',
  })
  sortIndex: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @ApiProperty({
    example: 'Subindustry Entity',
    description: 'an Object of class SubindustryEntity',
    type: [SubindustryEntity],
  })
  subindustry: SubindustryEntity[];
}
