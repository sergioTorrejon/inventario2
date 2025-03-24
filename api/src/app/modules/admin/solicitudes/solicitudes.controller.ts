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

import { SolicitudesService } from './solicitudes.service';
import { SolicitudesCreateDto, SolicitudesSearchDto, SolicitudesUpdateDto } from './dtos';
import { UserDto } from 'src/core/common/dtos/user/user.dto';

@ApiTags('Solicitudes')
//@Auth()
@Controller('solicitudes')
//@UseFilters(new HttpExceptionFilter())
export class SolicitudesController {
  constructor(
    private readonly service: SolicitudesService,
  ) { 
  }

  //FUNCIONA!!!!
  @Get()
  async getMany(@User() user:UserDto,@Query() pagination: PaginationDto, @Query() search:SolicitudesSearchDto) {
    return await this.service.getMany(user,pagination,search);
  }

  //FUNCIONA!!!!
  @Get(':id')
  async getById(@User() user,@Param('id') id: number) {
    return await this.service.getById(user,id);
  }

  //FUNCIONA!!!!
  @Post()
  async createOne(@User() user, @Body() dto: SolicitudesCreateDto) {
    return await this.service.createOne(user,dto);
  }

  //FUNCIONA!!!!
  @Put(':id')
  async editOne(@User() user,@Param('id') id: number, @Body() dto: SolicitudesUpdateDto) {
    return await this.service.editOne(user,id,dto);
  }

  //FUNCIONA!!!!
  @Delete(':id')
  async deleteOne(@User() user,@Param('id') id: number) {
    return await this.service.deleteOne(user,id);
  } 

}