import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Categorias } from '../../02-categorias/entities';

export class CreateDto {
  
  @ApiProperty()
  @IsString()
  categoria: Categorias;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  descripcion: string;

}

export class UpdateDto extends PartialType(
  OmitType(CreateDto, ['categoria',"codigo"] as const),
) {}
