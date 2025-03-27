import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresas } from 'src/app/modules/admin/empresas/empresas.entity';
import { EmpresasService } from 'src/app/modules/admin/empresas/empresas.service';



import { RegistrosFuncionarios } from '../registros/entities';
import {
  RegistrosFuncionariosService,
} from '../registros/registros-funcionarios.service';
import {
  RegistrosHechosPosteriores,
} from '../registros-hechos-posteriores/entities';
import {
  RegistrosHechosPosterioresService,
} from '../registros-hechos-posteriores/registros-hechos-posteriores.service';
import { RegistrosBajas } from './entities';
import { RegistrosBajasController } from './registros-bajas.controller';
import { RegistrosBajasService } from './registros_detalle.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrosBajas,RegistrosHechosPosteriores,RegistrosFuncionarios,Empresas])],
  controllers: [RegistrosBajasController],
  providers: [RegistrosBajasService,RegistrosHechosPosterioresService,RegistrosFuncionariosService,EmpresasService],
  exports: [RegistrosBajasService],
})
export class RegistrosBajasModule {}
