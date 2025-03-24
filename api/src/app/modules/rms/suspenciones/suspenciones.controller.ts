import { JwtAdminRoleGuard } from 'src/core/auth/guards/jwt-admin-role.guard';
import { JwtConsultaRoleGuard } from 'src/core/auth/guards/jwt-consulta-role.guard';
import { PaginationDto, SortDto, UserDto } from 'src/core/common/dtos';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards,} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuspencionesService } from './suspenciones.service';
import { 
  SuspencionesSearchDto as searchDto, 
  SuspencionesCreateDto as createDto, 
  SuspencionesUpdateDto as updateDto
} from './dtos';
import { User } from 'src/core/common/decorators/user/user.decorator';

@ApiTags('Suspenciones')
//@UseGuards(JwtAdminRoleGuard)
@Controller('suspenciones')
//@UseFilters(new HttpExceptionFilter())
export class SuspencionesController {
  constructor(
    private readonly service: SuspencionesService,
  ) { 
  }

  //FUNCIONA!!!!
  @Get()
  async getPagination(@User() userDto: UserDto, @Query() paginationDto: PaginationDto,@Query() sortDto: SortDto,@Query() searchDto: searchDto ) {
    return await this.service.getPagination(userDto,paginationDto,sortDto,searchDto);
  }

  //FUNCIONA!!!!
  @Get(':id')
  async getById(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.getById(userDto,id);
  }

  //FUNCIONA!!!!
  @Post()
  async createOne(@User() userDto: UserDto,@Body() createDto: createDto) {
    return await this.service.createOne(userDto,createDto);
  }

  //FUNCIONA!!!!
  @Put(':id')
  async editOne(@User() userDto: UserDto,@Param('id') id: number, @Body() updateDto: updateDto) {
    return await this.service.editOne(userDto,id,updateDto);
  }

  //FUNCIONA!!!!
  @Delete(':id')
  async logicDelete(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.deleteOne(userDto,id);
  } 

}