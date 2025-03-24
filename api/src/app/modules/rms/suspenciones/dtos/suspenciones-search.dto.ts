import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Catalogo } from 'src/app/config/catalogo/entities';
import { Personas } from 'src/app/modules/admin/database/personas/personas.entity';

export class SuspencionesSearchDto {
  
  @ApiProperty()
  @IsOptional()
  persona?: Personas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  estado?: string;

  @ApiProperty()
  @IsOptional()
  tipoCargo?: Catalogo;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  cargo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaIngreso?:string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nroIdentificacion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombres?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  apellidos?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoEmpresa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codEmpresa?: string;

}
