import { PaginationDto, SortDto, UserDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { 
  InhabilitacionesSearchDto as searchDto, 
  InhabilitacionesCreateDto as createDto, 
  InhabilitacionesUpdateDto as updateDto
} from './dtos';
import { Inhabilitaciones } from './entities';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { selectMany } from './repositorry/inhabilitaciones.query';

@Injectable()
export class InhabilitacionesService {
  constructor(
    @InjectRepository(Inhabilitaciones)
    private readonly repository: Repository<Inhabilitaciones>,    
    ) {
  }  

//#region CRUD SERVICES
//#region CRUD SERVICES
async getAll(userDto:UserDto, sortDto:SortDto, dto:searchDto) {
  const query = this.repository.createQueryBuilder('rf')
  .innerJoin('rf.personaNatural', 'pn')
  .innerJoin('rf.empresa', 'e')
  .leftJoinAndSelect("rf.tipoCargo", "tc")
  .where('rf.status=true')
  .orderBy(sortDto.sort, sortDto.order=='ASC'?'ASC':'DESC');;
  if(dto.estado) query.andWhere('rf.estado= :estado', { estado: dto.estado }); 
  if(dto.tipoCargo) query.andWhere('tc.id= :tipoCargo', { tipoCargo: dto.tipoCargo });
  if(dto.cargo) query.andWhere("rf.cargo ILIKE :cargo", { cargo: `%${dto.cargo}%` });
  if(dto.nroIdentificacion) query.andWhere("pn.nroIdentificacion ILIKE :nroId", { nroId: `%${dto.nroIdentificacion}%` });
  if(dto.nombres) query.andWhere("pn.nombres ILIKE :nombres ", { nombres: `%${dto.nombres}%` });
  if(dto.apellidos) query.andWhere("pn.primer_apellido LIKE :apellidos or pn.segundo_apellido ILIKE :apellidos", { apellidos: `%${dto.apellidos}%` });
  if(dto.fechaIngreso) query.andWhere("rf.fecha_ingreso> :fechaIngreso", { fechaIngreso: new Date(dto.fechaIngreso)});    
  if(userDto.company) query.andWhere('rf.id_empresa= :id_empresa', { id_empresa: userDto.company });
  if(dto.persona) query.andWhere('rf.id_persona= :id_persona', { id_persona: dto.persona });
  if(dto.tipoEmpresa) query.andWhere('e.id_tipo_empresa= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa });
  if(dto.codEmpresa) query.andWhere('e.codigo= :codEmpresa', { codEmpresa: dto.codEmpresa });
  
  const data = await query.select('*').getRawMany()
  const count = await query.getCount()
  return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count},userDto);
}

async getPagination(userDto:UserDto, paginationDto: PaginationDto, sortDto:SortDto, dto:searchDto) {
  const query = this.repository.createQueryBuilder('q')
  .where('q.status=true')
  .orderBy(sortDto.sort, sortDto.order=='ASC'?'ASC':'DESC')
  .offset((paginationDto.page-1)*paginationDto.limit)
  .limit(paginationDto.limit);
  if(dto.estado) query.andWhere('rf.estado= :estado', { estado: dto.estado }); 
  if(dto.tipoCargo) query.andWhere('tc.id= :tipoCargo', { tipoCargo: dto.tipoCargo });
  if(dto.cargo) query.andWhere("rf.cargo ILIKE :cargo", { cargo: `%${dto.cargo}%` });
  if(dto.nroIdentificacion) query.andWhere("pn.nroIdentificacion ILIKE :nroId", { nroId: `%${dto.nroIdentificacion}%` });
  if(dto.nombres) query.andWhere("pn.nombres ILIKE :nombres ", { nombres: `%${dto.nombres}%` });
  if(dto.apellidos) query.andWhere("pn.primer_apellido LIKE :apellidos or pn.segundo_apellido ILIKE :apellidos", { apellidos: `%${dto.apellidos}%` });
  if(dto.fechaIngreso) query.andWhere("rf.fecha_ingreso> :fechaIngreso", { fechaIngreso: new Date(dto.fechaIngreso)});    
  if(userDto.company) query.andWhere('rf.id_empresa= :id_empresa', { id_empresa: userDto.company });
  if(dto.persona) query.andWhere('rf.id_persona= :id_persona', { id_persona: dto.persona });
  if(dto.tipoEmpresa) query.andWhere('e.id_tipo_empresa= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa });
  if(dto.codEmpresa) query.andWhere('e.codigo= :codEmpresa', { codEmpresa: dto.codEmpresa });
  const data = await query.select('*').getRawMany()
  const count = await query.getCount()
  return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count},userDto);
}

async getById(userDto:UserDto,id: number)  {
  try{
    const getOne  = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe Datos con este usuario');
    return responseSuccess(RESP_MESSAGES.GET,getOne,userDto);
  }
  catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ,userDto));
    }
  }
}

async createOne(userDto:UserDto,createDto: createDto) {
  try{
    const getOne = await  this.repository.findOne({ where:{personaNatural: createDto.personaNatural, status: true }});
    if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');
    const create =  this.repository.create(createDto);
    create.userCreate = userDto.username
    const data = await  this.repository.save(create);
    return responseSuccess(RESP_MESSAGES.POST,data,userDto);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name,[],userDto));
  }
}

}

async editOne(userDto:UserDto,id: number, updateDto: updateDto) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe un registro con este id');
    const edited = this.repository.merge(getOne,updateDto);
    edited.userUpdate = userDto.username
    const data = await  this.repository.save(edited);
    return responseSuccess(RESP_MESSAGES.PUT,data,userDto);
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ,userDto));
  }
}


}

async deleteOne(userDto:UserDto,id: number) {
  try{
    const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
    if (!getOne)  throw new Error('No existe un registro con este id');
    getOne.userUpdate = userDto.username
    getOne.status = false
    const data = await  this.repository.save(getOne);
    return responseSuccess(RESP_MESSAGES.DELETE,data);
  }
  catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }
} 
//#endregion
}