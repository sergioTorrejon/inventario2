import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RegistrosBajas } from 'src/app/modules/rms/registros/registros-bajas/entities';

export class SolicitudesCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  TipoSolicitud: string;
  
  @ApiProperty()
  @IsOptional()
  registroBaja: RegistrosBajas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Estado?: string='pendiente';

  @ApiProperty()
  @IsOptional()
  @IsString()
  Descripcion: string;

  @ApiProperty()
  @IsOptional()
  FechaSolicitud?: Date = new Date(); 
}
