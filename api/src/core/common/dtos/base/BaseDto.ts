import {
    IsOptional,
    IsString,
    IsBoolean,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  
  export class BaseDto {

  @IsBoolean()
  @IsOptional()
  Status: boolean;

  @IsString()
  @IsOptional()
  UsuarioCreacion: string = '';

  //@IsString()
  @IsOptional()
  FechaCreacion: Date = new Date();

  @IsString()
  @IsOptional()
  UsuarioModificacion: string = '';

  //@IsString()
  @IsOptional()
  FechaModificacion: Date = new Date();

  }
  