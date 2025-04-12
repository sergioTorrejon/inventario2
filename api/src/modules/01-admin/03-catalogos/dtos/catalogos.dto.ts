import {
  IsOptional,
  IsString
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Categorias } from '../../02-categorias/entities';

export class CatalogosSearchDto {

  //--------CLAVE FORANEA
  @ApiProperty()
  @IsString()
  categoria: Categorias;

  //--------CAMPOS
  @ApiProperty()
  @IsOptional()
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;
  
}

export class CatalogosCreateDto {
  
  //--------CLAVE FORANEA
  @ApiProperty()
  @IsString()
  categoria: Categorias;

  //--------CAMPOS
  @ApiProperty()
  @IsOptional()
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;

}

export class CatalogosUpdateDto extends PartialType(
  OmitType(CatalogosCreateDto, ["codigo"] as const),
) {}


