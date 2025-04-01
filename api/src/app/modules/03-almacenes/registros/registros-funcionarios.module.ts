import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresas } from '../../02-data/empresas/empresas.entity';
import { EmpresasService } from '../../02-data/empresas/empresas.service';
import { RegistrosFuncionarios } from './entities';
import {
  RegistrosFuncionariosController,
} from './registros-funcionarios.controller';
import { RegistrosFuncionariosService } from './registros-funcionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrosFuncionarios, Empresas]),],
  controllers: [RegistrosFuncionariosController],
  providers: [RegistrosFuncionariosService,EmpresasService],
  exports: [RegistrosFuncionariosService],
})
export class RegistrosFuncionariosModule {}
