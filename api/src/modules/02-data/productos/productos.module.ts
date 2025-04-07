import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Productos } from './entities/productos.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';


const entities =    [Productos]
const controllers = [ProductosController]
const services =    [ProductosService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class ProductosModule {}
