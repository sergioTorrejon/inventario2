import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';

export class PersonasSearchDto {

  @ApiProperty()
  @IsString()
  tipoDocumento: Catalogos;
  
  @ApiProperty()
  @IsOptional()
  numeroIdentificacion?: string;

  @ApiProperty()
  @IsOptional()
  nombres?: string;

  @ApiProperty()
  @IsOptional()
  apellido_paterno?: string;

  @ApiProperty()
  @IsOptional()
  apellido_materno?: string;

}

export class PersonasCreateDto {
  
  @ApiProperty()
  @IsString()
  tipoDocumento: Catalogos;
  
  @ApiProperty()
  @IsOptional()
  numeroIdentificacion?: string;

  @ApiProperty()
  @IsOptional()
  nombres?: string;

  @ApiProperty()
  @IsOptional()
  apellido_paterno?: string;

  @ApiProperty()
  @IsOptional()
  apellido_materno?: string;

}

export class PersonasUpdateDto extends PartialType(
  OmitType(PersonasCreateDto, ["numeroIdentificacion"] as const),
) {}


