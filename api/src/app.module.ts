import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './config/config';
import { AuthModule } from './core/auth/auth.module';
import { ProductosModule } from './modules/02-data/productos/productos.module';
import { SettingsModule } from './modules/01-admin/01-settings/settings.module';
import { CategoriasModule } from './modules/01-admin/02-categorias/categorias.module';
import { CatalogosModule } from './modules/01-admin/03-catalogos/catalogos.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG as TypeOrmModuleOptions),
    AuthModule,
    
    //ADMIN
    SettingsModule,
    CategoriasModule,
    CatalogosModule,
    
    //DATA    
    ProductosModule,

    //INVENTARIOS


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
