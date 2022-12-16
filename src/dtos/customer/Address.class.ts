import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CountryEntity } from '..';

export class AddressEntity {
  @ApiProperty({
    example: '1231',
    description: 'An uuid of a address ',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'Niederösterreich',
    description: 'An uuid of a company ',
  })
  @IsNotEmpty()
  federal_state: string;

  @ApiProperty({
    example: '3100',
    description: 'A postal code of a company ',
  })
  @IsNotEmpty()
  postalcode: string;

  @ApiProperty({
    example: 'Sankt Pölten',
    description: 'A city name',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Musterfraustraße ',
    description: 'A street of a company ',
  })
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: '117/21',
    description: 'An street number of a company',
  })
  @IsNotEmpty()
  streetNumber: string;

  @ApiProperty({
    example: 'PB 11220',
    description: 'Additional Information of an address',
  })
  @IsNotEmpty()
  additional: string;

  @ApiProperty({
    example: 'True or False',
    description: 'Tells if an address is a billing address',
  })
  @IsNotEmpty()
  isBillingAddress: boolean;

  @ApiProperty({
    example: 'CountryEntity',
    description: 'A Country Entity',
    type: () => CountryEntity,
  })
  @IsNotEmpty()
  country: CountryEntity;
}
