import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Paises } from './paises.entity';
import { PaisesController } from './paises.controller';
import { PaisesService } from './paises.service';



const entities =    [Paises]
const controllers = [PaisesController]
const services =    [PaisesService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class PaisesModule {}
