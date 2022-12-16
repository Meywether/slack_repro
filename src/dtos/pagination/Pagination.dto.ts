import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 1,
    description: 'defines the page number, is always a number limit / page',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    example: 20,
    description: 'Maximum count of taken entries',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Max(20)
  limit: number;
}
