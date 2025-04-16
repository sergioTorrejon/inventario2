import {
  IsOptional
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CategoriasSearchDto {

  @ApiProperty()
  @IsOptional()
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;

}

export class CategoriasCreateDto {
  
  @ApiProperty()
  @IsOptional()
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;


}

export class CategoriasUpdateDto extends PartialType(
  OmitType(CategoriasCreateDto, ["codigo"] as const),
) {}


