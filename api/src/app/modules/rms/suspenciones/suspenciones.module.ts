import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from '../../admin/database/empresas/empresas.module';

import { Suspenciones } from './entities';
import { SuspencionesController } from './suspenciones.controller';
import { SuspencionesService } from './suspenciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suspenciones]), EmpresasModule],
  controllers: [SuspencionesController],
  providers: [SuspencionesService],
  exports: [SuspencionesService],
})
export class SuspencionesModule {}
