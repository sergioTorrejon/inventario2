import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Personas } from './entities/personas.entity';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';


const entities =    [Personas]
const controllers = [PersonasController]
const services =    [PersonasService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class PersonasModule {}
