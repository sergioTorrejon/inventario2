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
import { ProvedoresService } from './provedores.service';
import { 
  ProvedoresSearchDto as searchDto, 
  ProvedoresCreateDto as createDto, 
  ProvedoresUpdateDto as updateDto
} from './dto/provedores.dtos';

@ApiTags('CATALOGOS ESTADOS DEPARTAMENTOS')
@Auth()
@Controller('provedores')
//@UseFilters(new HttpExceptionFilter())
export class ProvedoresController {
  constructor(
    private readonly service:  ProvedoresService,
  ) { 
  }

  //FUNCIONA!!!!
  @Get()
  async getAll(@User() userDto: UserDto, @Query() paginationDto: PaginationDto,@Query() sortDto: SortDto, @Query() searchDto: searchDto ) {
    return await this.service.getAllPaginate(userDto,paginationDto,sortDto,searchDto);
  }

  @Get('listOptions')
  async getOptions(@User() userDto: UserDto) {
    return await this.service.getOptions();
  }
  
  //FUNCIONA!!!!
  @Get(':id')
  async getOne(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.getById(userDto,id);
  }



  //FUNCIONA!!!!
  @Post()
  async createOne(@User() userDto: UserDto,@Body() dto: createDto) {
    return await this.service.createOne(userDto,dto);
  }

  //FUNCIONA!!!!
  @Put(':id')
  async editOne(@User() userDto: UserDto, @Param('id') id: number, @Body() dto: updateDto) {
    return await this.service.editOne(userDto,id,dto);
  }

  //FUNCIONA!!!!
  @Delete(':id')
  async logicDelete(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.deleteOne(userDto,id);
  } 
}
