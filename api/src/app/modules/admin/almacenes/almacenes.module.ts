import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Almacenes } from './entities/almacenes.entity';
import { AlmacenesController } from './almacenes.controller';
import { AlmacenesService } from './almacenes.service';



const entities =    [Almacenes]
const controllers = [AlmacenesController]
const services =    [AlmacenesService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class AlmacenesModule {}
