import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categorias } from './entities/categorias.entity';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';


const entities =    [Categorias]
const controllers = [CategoriasController]
const services =    [CategoriasService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class CategoriasModule {}
