import { PaginationDto, SortDto } from 'src/core/common/dtos';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';

import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { Categorias } from './entities';
import { 
  CategoriasSearchDto as searchDto, 
  CategoriasCreateDto as createDto, 
  CategoriasUpdateDto as updateDto,
} from './dtos/categorias.dto';
import { responseSuccess, responseError } from 'src/core/common/res/res.config';
import { titleHeaderReport } from './categorias.config';


@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categorias) private readonly repository: Repository<Categorias>,
  ) { }

  //#region ---------------------------------------------------------------------------CRUD SERVICES
  //GET ALL
  async getAll(userDto:UserDto,paginationDto: PaginationDto, sortDto:SortDto,dto:searchDto) {
    const query = this.repository.createQueryBuilder('q')
    .where('q.active=true')
    .orderBy(sortDto.sort, sortDto.order=='asc'?'ASC':'DESC');
    //-----------------------------DESDE AQUI SE REALIZA LAS CONDICIONES-----------------------------
    if(dto.descripcion) query.andWhere("q.descripcion ILIKE :descripcion ", { descripcion: `%${dto.descripcion}%` });
    //-------------------------------------------------------------------------------------------------
    const data = await query.select('*').offset((paginationDto.page-1)*paginationDto.limit).limit(paginationDto.limit).getRawMany()
    const count = await query.getCount()
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  //GET ONE
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

  //CREATE ONE
  async createOne(userDto: UserDto,dto: createDto) {
    try{
      const getOne  = await  this.repository.findOne(
        //-----------------CONDICIÓN PARA VERIFICAR EL REGISTRO
        { where:{ codigo: dto.codigo, active:true}}
      )
      if (getOne)  throw new Error('El identificador ya existe');
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

  //UPDATE ONE
  async editOne(userDto: UserDto,id: number, dto: updateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , active:true}})
      if (!getOne)  throw new Error('No existe datos con este id');
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

  //DELETE ONE
  async deleteOne(userDto: UserDto,id: number) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , active:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const data = await  this.repository.save({...getOne,active:false});
      return responseSuccess(RESP_MESSAGES.DELETE,data);
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  } 

  async getReport(userDto:UserDto,dto:searchDto) {
    const query = this.repository.createQueryBuilder('q')
    .where('q.active=true');
    //-----------------------------DESDE AQUI SE REALIZA LAS CONDICIONES-----------------------------
    if(dto.descripcion) query.andWhere("q.descripcion ILIKE :descripcion ", { descripcion: `%${dto.descripcion}%` });
    //-------------------------------------------------------------------------------------------------
    const data = await query.select('*').getRawMany()
    const header = titleHeaderReport
    return {data:data,header:header};
  }
  //#region ---------------------------------------------------------------------------END CRUD
}
