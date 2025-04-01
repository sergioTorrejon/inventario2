import { JwtAdminRoleGuard } from 'src/core/auth/guards/jwt-admin-role.guard';
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';
import { User } from 'src/core/common/decorators/user/user.decorator';
import {
  PaginationDto,
  SortDto,
  UserDto,
} from 'src/core/common/dtos';
import { csvBuild } from 'src/utils/libs/csv/csv-create';
import { pdfBuild } from 'src/utils/libs/pdf/pdf-create';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  RegistrosFuncionariosCreateDto as createDto,
  RegistrosFuncionariosSearchDto as searchDto,
  RegistrosFuncionariosUpdateDto as updateDto,
} from './dtos';
import { RegistrosFuncionariosService } from './registros-funcionarios.service';

@ApiTags('Registros Funcionarios')
@Auth()
@Controller('registros_funcionarios')
//@UseFilters(new HttpExceptionFilter())
export class RegistrosFuncionariosController {
  constructor(
    private readonly service: RegistrosFuncionariosService,
  ) { 
  }

  //FUNCIONA!!!!
  //@UseGuards(JwtConsultaRoleGuard)
  @Get('consulta')
  async getManyConsulta(@User() userDto: UserDto, @Query() pagination: PaginationDto, @Query() searchDto: searchDto) {
    return await this.service.getManyConsulta(pagination,searchDto);
  }

    //---------------GET ONE FILE FOR VIEW AND DOWNLOAD ------------//
  @Get('downloadpdf')
  async getReportDataPdf(@User() userDto: UserDto, @Query() searchDto: searchDto, @Res() res:any) {
    const data = await this.service.getManyReport(searchDto);
    const pdf = await pdfBuild(data);
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=reporte.pdf`)
    return res.send(pdf)
  }

  @Get('downloadcsv')
  async getReportData(@User() userDto: UserDto, @Query() searchDto: searchDto, @Res() res) {
    console.log('hasta aqui', searchDto)
    const data = await this.service.getManyReport(searchDto);
    console.log('hasta aqui', data)
    const csv = await csvBuild(data);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `inline; filename=Reporte.xlsx`);
    return res.send(csv);
  }

  //FUNCIONA!!!!
  //@UseGuards(JwtAdminRoleGuard)
  @Get()
  async getMany(@User() userDto: UserDto,@Query() paginationDto: PaginationDto,@Query() sortDto: SortDto, @Query() searchDto: searchDto) {
    return await this.service.getMany(userDto,paginationDto,sortDto,searchDto);
  }

  //FUNCIONA!!!!
  @UseGuards(JwtAdminRoleGuard)
  @Get(':id')
  async getOne(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.getById(userDto,id);
  }

  //FUNCIONA!!!!
  @UseGuards(JwtAdminRoleGuard)
  @Post()
  async createOne(@User() userDto: UserDto,@Body() dto: createDto) {
    return await this.service.createOne(userDto,dto);
  }

  //FUNCIONA!!!!
  @UseGuards(JwtAdminRoleGuard)
  @Put(':id')
  async editOne(@User() userDto: UserDto, @Param('id') id: number, @Body() dto: updateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  @UseGuards(JwtAdminRoleGuard)
  @Delete(':id')
  async logicDelete(@User() userDto: UserDto,@Param('id') id: number) {
    return await this.service.deleteOne(id);
  } 

}