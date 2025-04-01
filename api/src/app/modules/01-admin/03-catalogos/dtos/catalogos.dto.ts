import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Categorias } from '../../02-categorias/entities';

export class CatalogoCreateDto {
  
  @ApiProperty()
  @IsString()
  pcategoria: Categorias;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  categoria: string;

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

export class CatalogoUpdateDto extends PartialType(
  OmitType(CatalogoCreateDto, ['categoria',"codigo"] as const),
) {}
