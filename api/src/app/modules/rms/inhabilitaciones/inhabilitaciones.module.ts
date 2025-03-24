import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasModule } from '../../admin/database/empresas/empresas.module';

import { Inhabilitaciones } from './entities';
import { InhabilitacionesController } from './inhabilitaciones.controller';
import { InhabilitacionesService } from './inhabilitaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inhabilitaciones]), EmpresasModule],
  controllers: [InhabilitacionesController],
  providers: [InhabilitacionesService],
  exports: [InhabilitacionesService],
})
export class InhabilitacionesModule {}
