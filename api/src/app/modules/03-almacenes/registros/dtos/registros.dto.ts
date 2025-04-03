import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { EstadosDepartamentos } from 'src/app/data/estados_departamentos/estados_departamentos.entity';
import { Personas } from 'src/app/modules/02-data/personas/entities/personas.entity';
import { Empresas } from 'src/app/modules/02-data/empresas/entities/empresas.entity';
import { Catalogos } from 'src/app/modules/01-admin/03-catalogos/entities';


export class CreateDto{
  
  @ApiProperty()
  @IsString()
  personaNatural: Personas;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa?: Empresas;

  @ApiProperty()
  @IsOptional()
  tipoCargo: Catalogos;

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


export class UpdateDto extends PartialType(
  OmitType( CreateDto, ['personaNatural'] as const),
) {}


export class SearchDto {
  
  /* -----------IS ADMINISTRADOR--------- */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoEmpresa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codEmpresa?: string;

  /* ----------- DTO SEARCH --------- */
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  estado?: string;

  @ApiProperty()
  @IsOptional()
  tipoCargo?: Catalogos;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  cargo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaIngreso?:string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nroIdentificacion?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombres?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  apellidos?: string;

/* --------------------PRUEBA------------------------ */
  @ApiProperty()
  @IsOptional()
  persona?: Personas;

}
