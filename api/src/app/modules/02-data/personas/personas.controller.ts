import { JwtAdminRoleGuard } from 'src/core/auth/guards/jwt-admin-role.guard';
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { 
  PersonasSearchDto as searchDto, 
  PersonasCreateDto as createDto, 
  PersonasUpdateDto as updateDto
} from './dtos/personas.dtos';
import { PersonasService } from './personas.service';

@ApiTags('Persona Natural')
@Controller('persona_natural')
@UseGuards(JwtAuthGuard)
//@UseFilters(new HttpExceptionFilter())
export class PersonasController {
  constructor(
    private readonly service: PersonasService,
  ) { 
  }

  @Get('config')
  async getConfig(@User() user,@Query() pagination: PaginationDto,@Query() dto:searchDto) {
    return await this.service.getConfig(pagination,dto);
  }
  
  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get()
  async getMany(@User() user,@Query() pagination: PaginationDto, @Query() search: searchDto) {
    return await this.service.getMany(pagination,search);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.service.getById(id);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('post'))
  //@UseGuards(JwtAdminRoleGuard)
  @Post()
  async createOne(@User() user, @Body() dto: createDto) {
      //console.log('request', request.user);
      //dto.UsuarioCreacion = request.user.username;
      //dto.FechaCreacion = new Date();

    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(
    @Req() request, @Param('id') id: number, @Body() dto: updateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  } 

}