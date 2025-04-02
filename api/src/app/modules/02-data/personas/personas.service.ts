import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Personas } from './entities/personas.entity';
import { 
  PersonasSearchDto as searchDto, 
  PersonasCreateDto as createDto, 
  PersonasUpdateDto as updateDto
} from './dtos/personas.dtos';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { selectQuery,whereQuery } from './repository/persona_natural.query';
import { PERSONAS_MODEL } from './personas.config';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Personas)
    private readonly repository: Repository<Personas>) {
  }

  async getConfig(pag: PaginationDto, dto:searchDto) {
    const data =  PERSONAS_MODEL
    return responseSuccess(RESP_MESSAGES.GET,data);
}
//#region CRUD SERVICES
  async getMany(pag: PaginationDto, search:searchDto) {
    const query = this.repository.createQueryBuilder('q').where(whereQuery.status)
    if(search.nroIdentificacion){query.andWhere(whereQuery.nroIdentificacion, { nroIdentificacion:  `%${search.nroIdentificacion}%` })}
    if(search.nombreCompleto){query.andWhere(whereQuery.nombreCompleto, { nombreCompleto: `%${search.nombreCompleto}%` })}
    //CONSULTA
    if(search.nroIdentificacionConsulta){query.andWhere(whereQuery.nroIdentificacionConsulta, { nroIdentificacionConsulta:  `${search.nroIdentificacionConsulta}` })}
    if(search.nombresConsulta){query.andWhere(whereQuery.nombresConsulta, { nombresConsulta: search.nombresConsulta})}
    if(search.apellidosConsulta){query.andWhere(whereQuery.apellidosConsulta, { apellidosConsulta:search.apellidosConsulta})}

    const data = await query.select(Object.values(selectQuery)).offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
    const count = await query.getCount()
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async getById(id: number)  {
      try{
        const query = this.repository.createQueryBuilder('q').where(whereQuery.status)
        .andWhere(whereQuery.getById, { id: id })
        const data  = await  query.select(Object.values(selectQuery)).getRawOne()
        if (!data)  throw new Error('No existe Datos con este identificador');
        return responseSuccess(RESP_MESSAGES.GET,data);
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async getByUnique(dto: any)  {
    try{
      const query = this.repository.createQueryBuilder('q').where(whereQuery.status)
      .andWhere(whereQuery.getByUnique, { nroIdentificacion: dto.nroIdentificacion })
      const data  = await  query.select('*').getRawOne()
      if (data)  throw new Error('Ya existe Datos con este identificador');
      return responseSuccess(RESP_MESSAGES.GET,data);
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: createDto) {
    try{
      const getOne = await this.getByUnique(dto);
      if (!getOne.success)  throw new Error(getOne.message);
      const create = this.repository.create(dto);
      const insert = await this.repository.save(create);
      const getRow = await this.getById(insert.id)
      return responseSuccess(RESP_MESSAGES.POST,getRow.data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: number, dto: updateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      if (!getOne)  throw new Error('No existe un registro con este id');
      const merge = this.repository.merge(getOne,dto);;
      const edit = await  this.repository.save(merge);
      const getRow = await this.getById(edit.id)
      return responseSuccess(RESP_MESSAGES.PUT,getRow.data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }


  }

  async deleteOne(id: number) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      if (!getOne)  throw new Error('No existe un registro con este id');
      await  this.repository.save({...getOne,status:false});
      return await responseSuccess(RESP_MESSAGES.DELETE,[]);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 
//#endregion
}
