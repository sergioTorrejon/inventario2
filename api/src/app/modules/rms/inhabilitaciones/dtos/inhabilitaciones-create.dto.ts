import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseDto } from 'src/core/common/dtos/base/BaseDto';

import { ApiProperty } from '@nestjs/swagger';

import { Empresas } from 'src/app/modules/admin/database/empresas/empresas.entity';
import { Personas } from 'src/app/modules/admin/database/personas/personas.entity';

export class InhabilitacionesCreateDto extends BaseDto{
  
  @ApiProperty()
  @IsString()
  personaNatural: Personas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa?: Empresas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoInhabilitacion?: string='';

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaInhabilitacion?:string;

}
