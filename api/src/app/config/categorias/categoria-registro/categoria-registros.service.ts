import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CategoriaRegistroCreateDto,
  CategoriaRegistroUpdateDto,
} from './dtos';
import { CategoriaRegistro } from './entities';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';

@Injectable()
export class CategoriaRegistroService {
  constructor(
    @InjectRepository(CategoriaRegistro)
    private readonly repository: Repository<CategoriaRegistro>) {
  }

//#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{status:true}})
    console.log(data)
    const count = await  this.repository.count({where:{status:true}})
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

   async getOne(id: string)  {
    try{
      const data  = await  this.repository.findOne({ where:{ id: +id , status:true}})
      if (!data)  throw new Error('No existe Datos con este usuario');
      return responseSuccess(RESP_MESSAGES.GET,{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: CategoriaRegistroCreateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, status: true }});
      if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');
      console.log('AQUI')  
      const create =  this.repository.create(dto);
      const {codigo,...data} = await  this.repository.save(create);
      return responseSuccess(RESP_MESSAGES.POST,{codigo});
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: string, dto: CategoriaRegistroUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
      if (!getOne)  throw new Error('No existe un registro con este id');
      const edited = Object.assign(getOne);
      const {username,...data} = await  this.repository.save(edited);
      return responseSuccess(RESP_MESSAGES.PUT,{username});
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }


  }

  async deleteOne(id: string) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
      if (!getOne)  throw new Error('No existe un registro con este id');
      const {codigo,...data} = await  this.repository.save({...getOne,status:false});
      return await responseSuccess(RESP_MESSAGES.DELETE,{codigo});
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 
//#endregion


  async getOptions() {
    const data = {
      baja: await this.queryOptions('baja'),
      baja_ejecutivos: await this.queryOptions('baja_ejecutivos'),
      hecho_posterior: await this.queryOptions('hecho_posterior'),
      hecho_posterior_ejecutivo: await this.queryOptions('hecho_posterior_ejecutivo'),
    }
    return responseSuccess(RESP_MESSAGES.GET,data);
    }
  
  async queryOptions(categoria:string) {
    const data = await this.repository
    .createQueryBuilder('q')
    .select("q.id as value, (q.codigo || '.- ' || q.descripcion) as label")
    .where('q.categoria= :categoria', { categoria: categoria })
    .getRawMany();
    return data;
    }
  
  async queryStringOptions(categoria:string) {
    const data = await this.repository
    .createQueryBuilder('q')
    .select("q.id as descripcion, (q.codigo || '.- ' || q.descripcion) as label")
    .where('q.categoria= :categoria', { categoria: categoria })
    .getRawMany();
    return data;
    }

}
