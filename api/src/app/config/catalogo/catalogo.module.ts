import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paises } from 'src/app/data/paises/paises.entity';
import { PaisesService } from 'src/app/data/paises/paises.service';
import { CategoriaEmpresaService } from '../categorias/categoria-empresa/categoria-empresa.service';
import { CategoriaEmpresa } from '../categorias/categoria-empresa/entities';
import { CategoriaRegistroService } from '../categorias/categoria-registro/categoria-registros.service';
import { CategoriaRegistro } from '../categorias/categoria-registro/entities';

import { CatalogoController } from './catalogo.controller';
import { CatalogoService } from './catalogo.service';
import { Catalogo } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Catalogo,CategoriaRegistro,CategoriaEmpresa,Paises])],
  controllers: [CatalogoController],
  providers: [CatalogoService,CategoriaRegistroService,CategoriaEmpresaService,PaisesService],
  exports: [CatalogoService],
})
export class CatalogoModule {}
