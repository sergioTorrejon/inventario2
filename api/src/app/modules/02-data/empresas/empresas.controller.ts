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
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';

import { 
  EmpresasSearchDto as searchDto, 
  EmpresasCreateDto as createDto, 
  EmpresasUpdateDto as updateDto
} from './empresas.dtos';
import { EmpresasService } from './empresas.service';

@ApiTags('Empresa')
@Auth()
@Controller('empresa')
//@UseFilters(new HttpExceptionFilter())
export class EmpresasController {
  constructor(
    private readonly service: EmpresasService,
    
  ) { 
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get('config')
  async getConfig(@User() user,@Query() pagination: PaginationDto,@Query() dto:searchDto) {
    return await this.service.getConfig(pagination,dto);
  }

  @Get()
  async getMany(@User() user,@Query() pagination: PaginationDto,@Query() dto:searchDto) {
    return await this.service.getMany(pagination,dto);
  }

  @Get('/listOptions')
  async getListOptions(@User() user,@Query() dto:searchDto) {
    return await this.service.getListEmpresas(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('post'))
  @Post()
  async createOne(@Body() dto: createDto) {
    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto:updateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  } 

}