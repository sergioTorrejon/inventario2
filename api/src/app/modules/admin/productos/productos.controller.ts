import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto, SortDto } from 'src/core/common/dtos';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';
import { HttpExceptionFilter } from 'src/core/common/filters';
import { ProductosService } from './productos.service';
import { 
  ProductosSearchDto as searchDto, 
  ProductosCreateDto as createDto, 
  ProductosUpdateDto as updateDto
} from './dtos/productos.dtos';

@ApiTags('CATALOGOS ESTADOS DEPARTAMENTOS')
@Auth()
@Controller('productos')
//@UseFilters(new HttpExceptionFilter())
export class ProductosController {
  constructor(
    private readonly service:  ProductosService,
  ) { 
  }

  //#region CRUD SERVICES

  //GETALL
  @Get()
  async getAll(@User() userDto: UserDto, @Query() paginationDto: PaginationDto,@Query() sortDto: SortDto, @Query() searchDto: searchDto ) {
    const data =  await this.service.getAll(userDto,paginationDto,sortDto,searchDto);
    console.log('GET PRODUCTOS', data)
    return data
  }

  //FUNCIONA!!!!
  @Get(':id')
  async getOne(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.getById(userDto,id);
  }

  //FUNCIONA!!!!
  @Post()
  async createOne(@User() userDto: UserDto,@Body() dto: createDto) {
    console.log('POST PRODUCTOS', userDto)
    return await this.service.createOne(userDto,dto);
  }

  //FUNCIONA!!!!
  @Put(':id')
  async editOne(@User() userDto: UserDto, @Param('id') id: number, @Body() dto: updateDto) {
    console.log('PUT PRODUCTOS', dto)
    return await this.service.editOne(userDto,id,dto);
  }

  //FUNCIONA!!!!
  @Delete(':id')
  async logicDelete(@User() userDto: UserDto,@Param('id') id: number) {
    console.log('DELETE PRODUCTOS', id)
    return await this.service.deleteOne(userDto,id);
  } 
}
