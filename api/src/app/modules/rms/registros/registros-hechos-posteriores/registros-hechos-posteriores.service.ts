import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  RegistrosHechosPosterioresCreateDto,
  RegistrosHechosPosterioresUpdateDto,
} from './dtos';
import { RegistrosHechosPosteriores } from './entities';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { RegistrosHechosPosterioresEditDto } from './dtos/registros-hechos-posteriores-edit.dto';

@Injectable()
export class RegistrosHechosPosterioresService {
  constructor(
    @InjectRepository(RegistrosHechosPosteriores)
    private readonly repository: Repository<RegistrosHechosPosteriores>) {
  }

//#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    console.log("Llego aqui a hechos posteriores");
    const data = await  this.repository.find({ where:{ status:true}})
    console.log(data)
    const count = await  this.repository.count({where:{status:true}})
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async consultaHechosPosterionesByIdBaja(IdRegistroBaja: any)  {
    try{
      const getOne = await this.repository.createQueryBuilder('q')
      .select("q.id as id, q.fecha_registro as fecha_registro,to_char(q.fecha_registro,'DD-MM-YYYY') as fecha_registro_format, q.descripcion, q.estado as estado,q.observaciones as observaciones, (cb.codigo || '.- ' || cb.descripcion) as causal, cb.id as id_causal")
      .where('q.status=true')
      .innerJoin('q.causal', 'cb')
      .andWhere('q.id_registros_baja= :IdRegistroBaja', { IdRegistroBaja: IdRegistroBaja.id })
      .getRawMany();

      console.log('**************************** HECHOS POSTERIORES**********************************')
      console.log('GETONE',getOne)
      if (!getOne)  throw new Error('No existe Datos con este registro de Baja');
      return responseSuccess(RESP_MESSAGES.GET,{data:getOne});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async getOne(id: string)  {
    try{
      const getOne = await this.repository.createQueryBuilder('q')
      //.select("q.id as id,q.nro_baja as nro_baja, q.fecha_baja as fecha_baja,to_char(q.fecha_baja,'DD-MM-YYYY') as fecha_baja_format, q.comentarios as comentarios,cb.descripcion as categoria_baja,cb.id as id_categoria_baja ")
      .innerJoin('q.registroBaja', 'rb')
      .innerJoin('q.categoriaBaja', 'cb')
      .where('q.status=true')
      .andWhere("q.id = :id", { id: id })
      .getRawOne();
      console.log('COUNTTT---->',getOne)
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

  async crearHechosPosteriores(id:number,dto) {
    console.log('dtonotiiii',dto)
    const hechosPosteriores = await JSON.parse(dto.hechosPosteriores);
    hechosPosteriores.forEach(async hechoPosterior => {
      hechoPosterior.registroBaja = id.toString();
      await this.createOne(hechoPosterior);
    });
  }

  async createOne(dto: RegistrosHechosPosterioresCreateDto) {
    try{
      console.log('AQUI')  
      const create =  this.repository.create(dto);
      const data = await  this.repository.save(create);
      return responseSuccess(RESP_MESSAGES.POST,data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: string, dto: RegistrosHechosPosterioresUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
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
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const data = await  this.repository.save({...getOne,status:false});
      return await responseSuccess(RESP_MESSAGES.DELETE,data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 
//#endregion

async confirmHechosPosteriores(id: number,dto: RegistrosHechosPosterioresEditDto) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe un usuario con este id');
    const data = await  this.repository.save({...getOne,estado:dto.estado,observaciones:dto.observaciones});
    return responseSuccess(RESP_MESSAGES.GET,data);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}

} 

}