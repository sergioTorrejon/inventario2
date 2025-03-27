import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './app/config/catalogo/catalogo.module';

import {
  CategoriaEmpresaModule,
} from './app/config/categorias/categoria-empresa/categoria-empresa.module';
import {
  CategoriaRegistroModule,
} from './app/config/categorias/categoria-registro/categoria-registros.module';
import { SolicitudesModule } from './app/modules/admin/solicitudes/solicitudes.module';
import { CiudadesMunicipiosModule } from './app/data/ciudades_municipios/ciudades_municipios.module';
import { EstadosDepartamentosModule } from './app/data/estados_departamentos/estados_departamentos.module';
import { PaisesModule } from './app/data/paises/paises.module';
import {
  RegistrosFuncionariosModule,
} from './app/modules/rms/registros-funcionarios/registros-funcionarios.module';
import {
  RegistrosBajasModule,
} from './app/modules/rms/registros/registros-bajas/registros-bajas.module';
import {
  RegistrosHechosPosterioresModule,
} from './app/modules/rms/registros/registros-hechos-posteriores/registros-hechos-posteriores.module';
import { InhabilitacionesModule } from './app/modules/rms/inhabilitaciones/inhabilitaciones.module';
import { SuspencionesModule } from './app/modules/rms/suspenciones/suspenciones.module';

import { DATABASE_CONFIG } from './config/config';
import { AuthModule } from './core/auth/auth.module';
import { EmpresasModule } from './app/modules/admin/empresas/empresas.module';
import { PersonasModule } from './app/modules/admin/personas/personas.module';
import { ProvedoresModule } from './app/modules/admin/provedores/provedores.module';
import { AlmacenesModule } from './app/modules/admin/almacenes/almacenes.module';
import { ProductosModule } from './app/modules/admin/productos/productos.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG as TypeOrmModuleOptions),
    AuthModule,
    CatalogoModule,
    CategoriaEmpresaModule,
    PersonasModule,
    EmpresasModule,
    RegistrosFuncionariosModule,
    RegistrosBajasModule,
    RegistrosHechosPosterioresModule,
    InhabilitacionesModule,
    SuspencionesModule,
    CategoriaRegistroModule,
    SolicitudesModule,

    //INVENTARIOS
    ProvedoresModule,
    AlmacenesModule,
    ProductosModule,

    //DATA
    PaisesModule,
    EstadosDepartamentosModule,
    CiudadesMunicipiosModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
