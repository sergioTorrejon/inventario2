import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateDto {
  
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(250)
  descripcion: string;
  
}

export class UpdateDto extends PartialType(
  OmitType(CreateDto, ["codigo"] as const),
) {}