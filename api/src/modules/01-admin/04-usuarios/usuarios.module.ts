import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categorias } from './entities/usuarios.entity';
import { CategoriasController } from './usuarios.controller';
import { CategoriasService } from './usuarios.service';


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
