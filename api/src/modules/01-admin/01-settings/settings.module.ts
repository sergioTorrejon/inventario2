import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Productos } from './entities/settings.entity';
import { ProductosController } from './settings.controller';
import { ProductosService } from './settings.service';


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
