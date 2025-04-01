import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto } from 'src/core/common/dtos';
import { HttpExceptionFilter } from 'src/core/common/filters';

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

import { CategoriasService } from './categorias.service';
import {
  CreateDto,
  UpdateDto,
} from './dtos';
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';

@Controller('categorias')
@Auth()
@UseFilters(new HttpExceptionFilter())
export class CategoriasController {
  constructor(
    private readonly service: CategoriasService,
  ) { 
  }


  @Get()
  async getMany(@User() user,@Query() pagination: PaginationDto) {
    return await this.service.getMany(pagination);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  @Post()
  async createOne(@Body() dto: CreateDto) {
    return await this.service.createOne(dto);
  }

  @Put(':id')
  async editOne(@Param('id') id: string, @Body() dto: UpdateDto) {
    return await this.service.editOne(id,dto);
  }

  @Delete(':id')
  async logicDelete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  }

}