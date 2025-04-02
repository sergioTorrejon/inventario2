import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateDto,
  UpdateDto,
} from './dtos';
import { Settings } from './entities';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly repository: Repository<Settings>,
    )
    {
  }

  //#region CRUD
  //GET ALL
  async getAll(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{active:true}})
    const count = await  this.repository.count({where:{active:true}})
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  //GET ONE
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

  //CREATE ONE
  async createOne(dto: CreateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, active: true }});
      if (getOne)  throw new Error('ya existe un registro con el identificador');
      console.log('AQUI')  
      const create =  this.repository.create(dto);
      return responseSuccess(RESP_MESSAGES.POST,create);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  //UPDATE ONE
  async editOne(id: string, dto: UpdateDto) {
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

  //DELETE ONE
  async deleteOne(id: string) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , active:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const {codigo,...data} = await  this.repository.save({...getOne,active:false});
      return await responseSuccess(RESP_MESSAGES.DELETE,{codigo});
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 
  //#region END CRUD

}






