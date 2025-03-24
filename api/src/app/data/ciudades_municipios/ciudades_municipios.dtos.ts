import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { EstadosDepartamentos } from '../estados_departamentos/estados_departamentos.entity';

export class CiudadesMunicipiosCreateDto {
  
  @ApiProperty()
  @IsString()
  estadoDepartamento: EstadosDepartamentos;

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

export class CiudadesMunicipiosUpdateDto extends PartialType(
  OmitType(CiudadesMunicipiosCreateDto, ["estadoDepartamento","nombre"] as const),
) {}

export class CiudadesMunicipiosSearchDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  estadoDepartamento?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  nombre?: string;
  
}
