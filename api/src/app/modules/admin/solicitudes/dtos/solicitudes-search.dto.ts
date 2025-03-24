import {
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  import { ApiProperty } from '@nestjs/swagger';
  
  
  export class SolicitudesSearchDto {
    
    @IsOptional()
    @IsString()
    empresa?:string;
  
    @IsOptional()
    @IsString()
    estado?:string;
  
    @IsOptional()
    @IsString()
    IdRegistroBaja?:string;
  
    @IsOptional()
    @IsString()
    nro_identificacion?:string;
  
  }
  