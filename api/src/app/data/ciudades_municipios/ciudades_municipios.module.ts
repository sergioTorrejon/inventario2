import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CiudadesMunicipios } from './ciudades_municipios.entity';
import { CiudadesMunicipiosController } from './ciudades_municipios.controller';
import { CiudadesMunicipiosService } from './ciudades_municipios.service';



const entities =    [CiudadesMunicipios]
const controllers = [CiudadesMunicipiosController]
const services =    [CiudadesMunicipiosService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class CiudadesMunicipiosModule {}
