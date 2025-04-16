import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Empresas } from './entities/empresas.entity';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';


const entities =    [Empresas]
const controllers = [EmpresasController]
const services =    [EmpresasService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class EmpresasModule {}
