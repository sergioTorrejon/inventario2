import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Catalogo } from 'src/app/config/catalogo/entities';
import { EstadosDepartamentos } from 'src/app/data/estados_departamentos/estados_departamentos.entity';
import { Personas } from 'src/app/modules/02-data/personas/personas.entity';
import { Empresas } from 'src/app/modules/02-data/empresas/empresas.entity';


export class RegistrosFuncionariosCreateDto{
  
  @ApiProperty()
  @IsString()
  personaNatural: Personas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa?: Empresas;

  @ApiProperty()
  @IsOptional()
  tipoCargo: Catalogo;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  cargo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoDirectivo?: string='';

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoFuncionario?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoContrato?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaIngreso?:string;

  @ApiProperty()
  @IsOptional()
  estadoDepartamento?: EstadosDepartamentos;

  @ApiProperty()
  @IsOptional()
  ciudadMunicipio?: EstadosDepartamentos;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  nroContrato: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codColegiatura?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoApoderado?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nroRepresentacionLegal?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaInicioRepresentacionLegal?:string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaFinRepresentacionLegal?:string;


  @ApiProperty()
  @IsString()
  @MaxLength(20)
  estado: string='activo';

}
