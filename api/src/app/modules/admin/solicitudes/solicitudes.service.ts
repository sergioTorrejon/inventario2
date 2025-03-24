import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { SolicitudesSearchDto, SolicitudesCreateDto, SolicitudesUpdateDto } from './dtos';
import { Solicitudes } from './entities';
import { UserDto } from 'src/core/common/dtos/user/user.dto';
import { selectManySolicitudes } from './repository/personas-naturales.query';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly repository: Repository<Solicitudes>) {
  }

//#region CRUD SERVICES
async getMany(user:UserDto,pag:PaginationDto,search:SolicitudesSearchDto) {
  const query = this.repository.createQueryBuilder('q').where({status:true})
  //if(search.nombres){query.andWhere(whereQuery.nombres, { nombres: `%${search.nombres}%` })}
  //if(search.nroIdentificacion){query.andWhere(whereQuery.nroIdentificacion, { nroIdentificacion:  `%${search.nroIdentificacion}%` })}
  const data = await query.select('*').offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
  const count = await query.getCount()
  return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
}

async getById(user:UserDto,id: number)  {
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

async createOne(user:UserDto,dto: SolicitudesCreateDto) {
  try{
    const getOne = await this.repository.findOne({ where:{ TipoSolicitud: dto.TipoSolicitud , status:true}});
    if (getOne)  throw new Error('Ya existe Datos con este identificador');
    const create = this.repository.create(dto);
    const insert = await this.repository.save(create);
    return responseSuccess(RESP_MESSAGES.POST,insert);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}

}

async editOne(user:UserDto,id: number, dto: any) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe un registro con este id');
    const merge = this.repository.merge(getOne,dto);;
    const edit = await  this.repository.save(merge);
    return responseSuccess(RESP_MESSAGES.PUT,edit);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}


}

async deleteOne(user:UserDto,id: number) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe un registro con este id');
    await  this.repository.save({...getOne,status:false});
    return responseSuccess(RESP_MESSAGES.DELETE,[]);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}

} 
//#endregion
}
