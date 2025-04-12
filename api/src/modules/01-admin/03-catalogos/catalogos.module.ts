import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Catalogos } from './entities/catalogos.entity';
import { CatalogosController } from './catalogos.controller';
import { CatalogosService } from './catalogos.service';


const entities =    [Catalogos]
const controllers = [CatalogosController]
const services =    [CatalogosService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class CatalogosModule {}
