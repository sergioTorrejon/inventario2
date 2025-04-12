import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Settings } from './entities/settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';


const entities =    [Settings]
const controllers = [SettingsController]
const services =    [SettingsService]

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class SettingsModule {}
