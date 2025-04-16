import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Registros } from './entities/registros.entity';
import { RegistrosController } from './registros.controller';
import { RegistrosService } from './registros.service';


const entities =    [Registros]
const controllers = [RegistrosController]
const services =    [RegistrosService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class RegistrosModule {}
