import { GLOBAL_OPTIONS } from 'src/core/common/constants/constants';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Catalogos } from './entities';
import { createDto, updateDto } from './dtos';

@Injectable()
export class CatalogosService {
  constructor(
    @InjectRepository(Catalogos)
    private readonly repository: Repository<Catalogos>,
    )
    {
  }

  //#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{active:true}})
    const count = await  this.repository.count({where:{active:true}})
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async getOne(id: string)  {
    try{
      const data  = await  this.repository.findOne({ where:{ id: +id , active:true}})
      if (!data)  throw new Error('No existe Datos con este usuario');
      return responseSuccess(RESP_MESSAGES.GET,{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: createDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, active: true }});
      if (getOne)  throw new Error('ya existe un registro con el identificador');
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

  async editOne(id: string, dto: updateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , active:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
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
      const getOne = await  this.repository.findOne({ where:{ id: +id , active:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
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

}






