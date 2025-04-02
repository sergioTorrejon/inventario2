import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Empresas } from './entities/empresas.entity';
import { 
  EmpresasSearchDto as searchDto, 
  EmpresasCreateDto as createDto, 
  EmpresasUpdateDto as updateDto
} from './dtos/empresas.dtos';
import { EMPRESA_MODEL } from './empresa.config';


@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresas)
    private readonly repository: Repository<Empresas>,
    ) {
  }

  async getConfig(pag: PaginationDto, dto:searchDto) {
      const data = await  EMPRESA_MODEL
      return responseSuccess(RESP_MESSAGES.GET,EMPRESA_MODEL);
  }

  async getMany(pag: PaginationDto, dto:searchDto) {
    const query = this.repository.createQueryBuilder('emp')
        .innerJoin('emp.idTipoEmpresa', 'catemp')
        .where('emp.status=true');
    if(dto.tipoEmpresa) query.andWhere('catemp.codigo= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa }); 
    if(dto.nombreEmpresa) query.andWhere("LOWER(emp.nombre) LIKE :nombreEmpresa", { nombreEmpresa: `%${ dto.nombreEmpresa.toLowerCase() }%` });

    const data = await query.select('*,emp.codigo as codigoEmpresa,emp.id as id').offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
    const count = await query.getCount()

    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async getListEmpresas(dto:searchDto) {
    const query = this.repository.createQueryBuilder('emp')
        .where('emp.status=true');
    if(dto.tipoEmpresa) query.andWhere('emp.id_tipo_empresa= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa }); 

    const data = await query.select('emp.codigo as value,emp.nombre as label').getRawMany()

    return responseSuccess(RESP_MESSAGES.GET,data);
  }

  async getOne(id: number)  {
      try{
        const data  = await  this.repository.findOne({ where:{ id: id , status:true}})
        if (!data)  throw new Error('No existe Datos con este identificador');
        return responseSuccess(RESP_MESSAGES.GET,{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async getOneByCode(codigo: string)  {
      try{
        const data: Empresas = await this.repository.findOne({ where:{ codigo: codigo , status:true}});
        if (!data)  throw new Error('No existe Datos con este identificador');
        return data;
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: createDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, status: true }});
      if (getOne)  throw new Error('ya existe un registro con el identificador');
      console.log('AQUI',getOne)  
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

  async editOne(id: number, dto: updateDto) {
    try{
      console.log('AQUI',dto) 
      console.log('AQUI',id) 
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
      console.log('AQUI',getOne) 
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const edited = this.repository.merge(getOne,dto);
      const data = await  this.repository.save(edited);
      return responseSuccess(RESP_MESSAGES.PUT,{data});
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
      const data = await  this.repository.save({...getOne,status:false});
      return await responseSuccess(RESP_MESSAGES.DELETE,data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 

}
