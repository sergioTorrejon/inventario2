import { PaginationDto, SortDto } from 'src/core/common/dtos';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';

import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { Productos } from './entities/productos.entity';
import { 
  ProductosSearchDto as searchDto, 
  ProductosCreateDto as createDto, 
  ProductosUpdateDto as updateDto
} from './dtos/productos.dtos';
import { responseSuccess, responseError } from 'src/core/common/res/res.config';


@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos) private readonly repository: Repository<Productos>,
    ) { }
/************************************************************************************************ */
//#region CRUD SERVICES
async getAllPaginate(userDto:UserDto,paginationDto: PaginationDto, sortDto:SortDto,dto:searchDto) {
  const query = this.repository.createQueryBuilder('q')
  .where('q.active=true')
  .orderBy(sortDto.sort, sortDto.order=='asc'?'ASC':'DESC');
  const data = await query.select('*').offset((paginationDto.page-1)*paginationDto.limit).limit(paginationDto.limit).getRawMany()
  const count = await query.getCount()
  return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
}

async getById(userDto:UserDto,id: number)  {
  try{
    const getOne  = await  this.repository.findOne({ where:{ id: id , active:true}})
    if (!getOne)  throw new Error('No existe Datos con este usuario');
    return responseSuccess(RESP_MESSAGES.GET,getOne,userDto);
  }
  catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ,userDto));
    }
  }
}

async createOne(userDto: UserDto,dto: createDto) {
  try{
    const getOne  = await  this.repository.findOne({ where:{ nombre: dto.nombre, active:true}})
    if (!getOne)  throw new Error('No existe Datos con este usuario');
    const create =  this.repository.create(dto);
    create.userCreate = userDto.username;
    const data = await this.repository.save(create);
    return responseSuccess(RESP_MESSAGES.POST,data);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
    }
  }
}

async editOne(userDto: UserDto,id: number, dto: updateDto) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , active:true}})
    if (!getOne)  throw new Error('No existe un usuario con este id');
    const edited = this.repository.merge(getOne,dto);
    const data = await  this.repository.save(edited);
    return responseSuccess(RESP_MESSAGES.PUT,data);
  }
  catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }
}

async deleteOne(userDto: UserDto,id: number) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , active:true}})
    if (!getOne)  throw new Error('No existe un usuario con este id');
    const data = await  this.repository.save({...getOne,status:false});
    return responseSuccess(RESP_MESSAGES.DELETE,data);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}
} 

async getOptions() {
  const data = {
    estadosDepartamentos: await this.queryOptions(),
  }
  return responseSuccess(RESP_MESSAGES.GET,data);
  }

  
  async queryOptions() {
    const data = await this.repository
    .createQueryBuilder('q')
    .innerJoin('q.pais', 'p')
    .select("q.id as value, q.nombre as label, p.nombre as pais")
    .getRawMany();
    return data;
  }

//#endregion
}
