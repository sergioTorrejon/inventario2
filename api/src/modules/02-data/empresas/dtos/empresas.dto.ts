import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';

export class EmpresasSearchDto {

  @ApiProperty()
  @IsString()
  tipoEmpresa: Catalogos;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  categoria?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;
  
}

export class EmpresasCreateDto {
  
  @ApiProperty()
  @IsString()
  tipoEmpresa: Catalogos;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  categoria?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;

}

export class EmpresasUpdateDto extends PartialType(
  OmitType(EmpresasCreateDto, ["codigo"] as const),
) {}


