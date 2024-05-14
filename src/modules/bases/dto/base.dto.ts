import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export abstract class BaseDTO {
  @ApiProperty({ description: '' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: '' })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
