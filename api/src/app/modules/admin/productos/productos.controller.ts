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
  UseFilters,
} from '@nestjs/common';
import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { Auth } from 'src/core/common/decorators/auth/auth.decorator';
import { ProductosService } from './productos.service';
import { 
  ProductosSearchDto as searchDto, 
  ProductosCreateDto as createDto, 
  ProductosUpdateDto as updateDto,
  ProductosSearchDto
} from './dtos/productos.dtos';
import { csvBuild } from 'src/utils/libs/csv/csv-create';
import { pdfBuild } from 'src/utils/libs/pdf/pdf-create';

@Controller('productos')
@Auth()
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
    console.log('GET PRODUCTOS', searchDto)
    const data =  await this.service.getAll(userDto,paginationDto,sortDto,searchDto);
    return data
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

    //FUNCIONA!!!!
    @Get(':id')
    async getOne(@User() userDto: UserDto,@Param('id') id: number) {
      return await this.service.getById(userDto,id);
    }

      //---------------GET ONE FILE FOR VIEW AND DOWNLOAD ------------//
    @Get('/download/pdf')
    async getReportDataPdf(@Query() searchDto: ProductosSearchDto, @Res() res:any) {
      const data = await this.service.getManyReport(searchDto);
      const pdf = await pdfBuild(data);
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `inline; filename=reporte.pdf`)
      return res.send(pdf)
    }
  
    @Get('/download/csv')
    async getReportData(@Query() searchDto: ProductosSearchDto, @Res() res) {
      console.log('hasta aqui', searchDto)
      const data = await this.service.getManyReport(searchDto);
      console.log('hasta aqui', data)
      const csv = await csvBuild(data);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `inline; filename=Reporte.xlsx`);
      return res.send(csv);
    }



}
