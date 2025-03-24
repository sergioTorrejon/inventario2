import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CategoriaEmpresa } from 'src/app/config/categorias/categoria-empresa/entities';

export class SolicitudesUpdateDto {
  @ApiProperty()
  @IsOptional()
  idTipoEmpresa: CategoriaEmpresa;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  nombre: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  nombreCorto: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  nroSeprem?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  nit?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  telefono?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  direccion?: string;
}
