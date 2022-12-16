import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { AddressEntity, CompanySFTPEntity } from '..';

export class CompanyEntity {
  @ApiProperty({
    example: '1231',
    description: 'An uuid of a company ',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'xxx GmbH',
    description: 'A company name',
  })
  @IsNotEmpty()
  companyName: string;

  createdAt: Date;

  isFranchise: boolean;

  externalCustomerCompanyID: string;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  @Exclude()
  version: number;

  @ApiProperty({
    example: '1231',
    description: 'A valid Address Entity ',
    type: () => AddressEntity,
  })
  address: AddressEntity;

  @ApiProperty({
    example: '1231',
    description: 'A valid CompanySFTP Entity ',
    type: () => CompanySFTPEntity,
  })
  companySftp: CompanySFTPEntity;
}
