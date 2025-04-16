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
  Res,
  UseFilters
} from '@nestjs/common';
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';
import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { EmpresasService } from './empresas.service';
import { 
  EmpresasCreateDto as CreateDto, 
  EmpresasUpdateDto as UpdateDto,
  EmpresasSearchDto as SearchDto, 
} from './dtos/empresas.dto';
import { csvBuild } from 'src/utils/libs/csv/csv-create';
import { pdfBuild } from 'src/utils/libs/pdf/pdf-create';
import { HttpExceptionFilter } from 'src/core/common/filters';
import { CONFIG } from './empresas.config';

@Controller('empresas')
@Auth()
@UseFilters(new HttpExceptionFilter())
export class EmpresasController {
  constructor(
    private readonly service:  EmpresasService,
  ) { 
  }

  //#region CRUD SERVICES
  //GETALL
  @Get()
  async getAll(@User() userDto: UserDto, @Query() paginationDto: PaginationDto,@Query() sortDto: SortDto, @Query() searchDto: SearchDto ) {
    console.log('GET ALL',CONFIG.name )
    const data =  await this.service.getAll(userDto,paginationDto,sortDto,searchDto);
    return data
  }

  //GET ONE
  @Get(':id')
  async getOne(@User() userDto: UserDto,@Param('id') id: number) {
    console.log('GET ONE',CONFIG.name )
    return await this.service.getById(userDto,id);
  }

  //CREATE ONE
  @Post()
  async createOne(@User() userDto: UserDto,@Body() dto: CreateDto) {
    console.log('POST ONE',CONFIG.name )
    return await this.service.createOne(userDto,dto);
  }

  //UPDATE ONE
  @Put(':id')
  async editOne(@User() userDto: UserDto, @Param('id') id: number, @Body() dto: UpdateDto) {
    console.log('PUT ONE',CONFIG.name )
    return await this.service.editOne(userDto,id,dto);
  }

  //DELETE ONE
  @Delete(':id')
  async logicDelete(@User() userDto: UserDto,@Param('id') id: number) {
    console.log('DELETE ONE',CONFIG.name )
    return await this.service.deleteOne(userDto,id);
  } 

  //DOWNLOAD PDF
  @Get('/download/pdf')
  async getReportPdf(@User() userDto: UserDto,@Query() searchDto: SearchDto, @Res() res:any) {
    console.log('DOWNLOAD PDF',CONFIG.name )
    const data = await this.service.getReport(userDto,searchDto);
    const pdf = await pdfBuild(data);
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename=reporte.pdf`)
    return res.send(pdf)
  }
  
  //DOWNLOAD EXCEL
  @Get('/download/csv')
  async getReportCsv(@User() userDto: UserDto,@Query() searchDto: SearchDto, @Res() res) {
    console.log('DOWNLOAD CSV',CONFIG.name )
    const data = await this.service.getReport(userDto,searchDto);
    const csv = await csvBuild(data);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `inline; filename=Reporte.xlsx`);
    return res.send(csv);
  }
  //#region END CRUD SERVICES




}
