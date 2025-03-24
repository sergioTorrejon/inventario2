import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriaRegistroController } from './categoria-registros.controller';
import { CategoriaRegistroService } from './categoria-registros.service';
import { CategoriaRegistro } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaRegistro])],
  controllers: [CategoriaRegistroController],
  providers: [CategoriaRegistroService],
  exports: [CategoriaRegistroService],
})
export class CategoriaRegistroModule {}
