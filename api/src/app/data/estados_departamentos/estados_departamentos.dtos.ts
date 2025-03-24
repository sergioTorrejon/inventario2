import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Paises } from '../paises/paises.entity';

export class EstadosDepartamentosCreateDto {
  
  @ApiProperty()
  @IsString()
  pais: Paises;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  descripcion?: string;

}

export class EstadosDepartamentosUpdateDto extends PartialType(
  OmitType(EstadosDepartamentosCreateDto, ["pais","nombre"] as const),
) {}

export class EstadosDepartamentosSearchDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  pais?: Paises;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  nombre?: string;
  
}
