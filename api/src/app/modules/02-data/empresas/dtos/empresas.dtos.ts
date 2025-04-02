import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CategoriaEmpresa } from 'src/app/config/categorias/categoria-empresa/entities';

export class EmpresasCreateDto {
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

export class EmpresasUpdateDto extends PartialType(
  OmitType(EmpresasCreateDto, ['codigo',] as const),
) {}
  

export class EmpresasSearchDto {
    
    @ApiProperty()
    @IsOptional()
    tipoEmpresa?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(5)
    codigo?: string;

    @ApiProperty()
    @IsOptional()
    nombreEmpresa?: string;
  
}
  
