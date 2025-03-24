import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Provedores } from './entities/provedores.entity';
import { ProvedoresController } from './provedores.controller';
import { ProvedoresService } from './provedores.service';



const entities =    [Provedores]
const controllers = [ProvedoresController]
const services =    [ProvedoresService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class ProvedoresModule {}
