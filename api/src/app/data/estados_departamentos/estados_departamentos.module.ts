import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstadosDepartamentos } from './estados_departamentos.entity';
import { EstadosDepartamentosController } from './estados_departamentos.controller';
import { EstadosDepartamentosService } from './estados_departamentos.service';



const entities =    [EstadosDepartamentos]
const controllers = [EstadosDepartamentosController]
const services =    [EstadosDepartamentosService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class EstadosDepartamentosModule {}
