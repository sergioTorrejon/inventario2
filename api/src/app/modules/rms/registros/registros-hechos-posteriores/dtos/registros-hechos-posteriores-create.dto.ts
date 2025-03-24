import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  CategoriaRegistro,
} from 'src/app/config/categorias/categoria-registro/entities';

import { ApiProperty } from '@nestjs/swagger';

import { RegistrosBajas } from '../../registros-bajas/entities';

export class RegistrosHechosPosterioresCreateDto {

  @ApiProperty()
  @IsOptional()
  registroBaja: RegistrosBajas;

  @ApiProperty()
  @IsString()
  causal: CategoriaRegistro;
  
  @IsOptional()
  @IsString()
  fecha?:string='';

  @IsOptional()
  @IsString()
  @MaxLength(2000,{message:'La longitud rc_comentarios no puede ser menor a 2 caracteres y mayor a 2000 caracteres'})
  descripcion?: string='';

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  estado: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000,{message:'La longitud rc_comentarios no puede ser menor a 2 caracteres y mayor a 2000 caracteres'})
  observaciones?: string='';


}
