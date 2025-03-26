import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class ProductosCreateDto {
  
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

export class ProductosUpdateDto extends PartialType(
  OmitType(ProductosCreateDto, ["codigo"] as const),
) {}

export class ProductosSearchDto {

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
