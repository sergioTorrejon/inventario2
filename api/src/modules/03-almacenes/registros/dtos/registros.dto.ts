import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';

export class RegistrosSearchDto {

  @ApiProperty()
  @IsString()
  tipoProducto: Catalogos;

  @ApiProperty()
  @IsOptional()
  categoria?: string;

  @ApiProperty()
  @IsOptional()
  marca?: string;

  @ApiProperty()
  @IsOptional()
  modelo?: string;

  @ApiProperty()
  @IsOptional()
  medida?: string;

  @ApiProperty()
  @IsOptional()
  descripcion?: string;
  
}

export class RegistrosCreateDto {
  
  @ApiProperty()
  @IsString()
  tipoProducto: Catalogos;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  codigo?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  categoria: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  marca?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  modelo?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  medida?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(250)
  descripcion?: string;

}

export class RegistrosUpdateDto extends PartialType(
  OmitType(RegistrosCreateDto, ["codigo"] as const),
) {}


