import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegistrosHechosPosterioresEditDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000,{message:'La longitud rc_comentarios no puede ser menor a 2 caracteres y mayor a 2000 caracteres'})
  observaciones?: string;


}
