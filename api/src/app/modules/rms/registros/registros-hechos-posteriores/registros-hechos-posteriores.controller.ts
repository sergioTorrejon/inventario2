import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto } from 'src/core/common/dtos';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegistrosHechosPosterioresUpdateDto } from './dtos';
import {
  RegistrosHechosPosterioresService,
} from './registros-hechos-posteriores.service';
import { RegistrosHechosPosterioresEditDto } from './dtos/registros-hechos-posteriores-edit.dto';

@ApiTags('Categoria Empresa')
//@Auth()
@Controller('registros_hechos_posteriores')
//@UseFilters(new HttpExceptionFilter())
export class RegistrosHechosPosterioresController {
  constructor(
    private readonly service: RegistrosHechosPosterioresService,
  ) { 
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get()
  async getMany(@User() user,@Query() pagination: PaginationDto) { 
    return await this.service.getMany(pagination);
  }

  //@UseGuards(JwtConsultaRoleGuard)
  @Get('consulta_hechos/:id')
  async consultaHechosPosterionesByIdBaja(@User() user, @Param() id: number) {
    return await this.service.consultaHechosPosterionesByIdBaja(id);
  }

  @Get('confirm/:id')
  async confirmHechosPosterionesByIdBaja(@User() user, @Param('id') id: number, @Query() dto: RegistrosHechosPosterioresEditDto) {
    console.log(dto)
    return await this.service.confirmHechosPosteriores(id,dto);
  }


  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get('paginate')
  async _getMany(@User() user,@Query() pagination: PaginationDto) {
    return await this.service.getMany(pagination);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('post'))
  @Post()
  async createOne(@Body() dto: any) {
    console.log(dto)
    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(@Param('id') id: string, @Body() dto: RegistrosHechosPosterioresUpdateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  } 

}
