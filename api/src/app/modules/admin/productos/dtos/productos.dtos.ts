import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Provedores } from '../../provedores/entities/provedores.entity';

export class ProductosCreateDto {
  
  @ApiProperty()
  @IsString()
  provedor: Provedores;

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

export class ProductosUpdateDto extends PartialType(
  OmitType(ProductosCreateDto, ["provedor","nombre"] as const),
) {}

export class ProductosSearchDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  provedor?: Provedores;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  codigo?: string;

  @ApiProperty()
  @IsOptional()
  nombre?: string;
  
}
