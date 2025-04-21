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
import { UsuariosModule } from './modules/01-admin/04-usuarios/usuarios.module';
import { EmpresasModule } from './modules/02-data/empresas/empresas.module';
import { PersonasModule } from './modules/02-data/personas/personas.module';
import { RegistrosModule } from './modules/03-almacenes/registros/registros.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG as TypeOrmModuleOptions),
    AuthModule,
    
    //ADMIN
    SettingsModule,
    CategoriasModule,
    CatalogosModule,
    UsuariosModule,
    
    
    //DATA    
    EmpresasModule,
    PersonasModule,
    ProductosModule,
        
    //INVENTARIOS
    RegistrosModule,    


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
