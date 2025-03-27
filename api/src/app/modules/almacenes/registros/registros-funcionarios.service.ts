import { PaginationDto, SortDto, UserDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/core/common/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { 
  RegistrosFuncionariosSearchDto as searchDto,
  RegistrosFuncionariosCreateDto as createDto, 
  RegistrosFuncionariosUpdateDto as updateDto,
} from './dtos';
import { RegistrosFuncionarios } from './entities';
import { RESP_MESSAGES } from 'src/core/common/constants/resp-messages';
import { selectMany, selectReport, titleHeader } from './repositorry/registros.query';
import { EmpresasService } from '../../admin/empresas/empresas.service';

@Injectable()
export class RegistrosFuncionariosService {
  constructor(
    @InjectRepository(RegistrosFuncionarios)
    private readonly repository: Repository<RegistrosFuncionarios>, 
    private readonly serviceEmpresa: EmpresasService,
    ) {
  }  

//#region CRUD SERVICES
  async getMany(userDto:UserDto,paginationDto: PaginationDto, sortDto:SortDto,dto:searchDto) {
    const query = this.repository.createQueryBuilder('rf')
        .innerJoin('rf.personaNatural', 'pn')
        .innerJoin('rf.empresa', 'e')
        .leftJoinAndSelect("rf.bajas", "baja", "baja.status = :status", {status: true})
        .leftJoinAndSelect("rf.tipoCargo", "tc")
        .where('rf.status=true')
        .orderBy(sortDto.sort, sortDto.order=='asc'?'ASC':'DESC');
    if(dto.estado) query.andWhere('rf.estado= :estado', { estado: dto.estado }); 
    if(dto.tipoCargo) query.andWhere('tc.id= :tipoCargo', { tipoCargo: dto.tipoCargo });
    if(dto.cargo) query.andWhere("rf.cargo ILIKE :cargo", { cargo: `%${dto.cargo}%` });
    if(dto.nroIdentificacion) query.andWhere("pn.nroIdentificacion ILIKE :nroId", { nroId: `%${dto.nroIdentificacion}%` });
    if(dto.nombres) query.andWhere("pn.nombres ILIKE :nombres ", { nombres: `%${dto.nombres}%` });
    if(dto.apellidos) query.andWhere("pn.primer_apellido LIKE :apellidos or pn.segundo_apellido ILIKE :apellidos", { apellidos: `%${dto.apellidos}%` });
    if(dto.fechaIngreso) query.andWhere("rf.fecha_ingreso> :fechaIngreso", { fechaIngreso: new Date(dto.fechaIngreso)}); 
    if(userDto.company&&userDto.company!='APS') query.andWhere('e.codigo= :codigo', { codigo: userDto.company });   
    if(dto.persona) query.andWhere('rf.id_persona= :id_persona', { id_persona: dto.persona });
    if(dto.tipoEmpresa) query.andWhere('e.id_tipo_empresa= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa });
    if(dto.codEmpresa) query.andWhere('e.codigo= :codEmpresa', { codEmpresa: dto.codEmpresa });
    const isAdministrator=userDto.role.includes('administrador')||userDto.company=='APS'
    if (!isAdministrator){
      if(userDto.company) query.andWhere('e.codigo= :codigo', { codigo: userDto.company });
    }
    const data = await query.select(selectMany).offset((paginationDto.page-1)*paginationDto.limit).limit(paginationDto.limit).getRawMany()
    const count = await query.getCount()
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async getManyConsulta(pag: PaginationDto,dto:searchDto) {
    const query = this.repository.createQueryBuilder('rf')
        .innerJoin('rf.personaNatural', 'pn')
        .innerJoin('rf.empresa', 'e')
        .leftJoinAndSelect("rf.bajas", "baja", "baja.status = :status", {status: true})
        .leftJoinAndSelect("rf.tipoCargo", "tc")
        .where('rf.status=true');
    if(dto.nroIdentificacion) query.andWhere("pn.nroIdentificacion ILIKE :nroIdentificacion", { nroIdentificacion: dto.nroIdentificacion });
    const data = await query.select(selectMany).offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
    const count = await query.getCount()
    return responseSuccess(RESP_MESSAGES.GET,{data:data,count:count});
  }

  async getManyReport(dto:searchDto) {
    const query = this.repository.createQueryBuilder('rf')
        .innerJoin('rf.personaNatural', 'pn')
        .innerJoin('rf.empresa', 'e')
        .leftJoinAndSelect("rf.bajas", "baja", "baja.status = :status", {status: true})
        .leftJoinAndSelect("rf.tipoCargo", "tc")
        .where('rf.status=true');
        //.orderBy(sortDto.sort, sortDto.order=='asc'?'ASC':'DESC');
    if(dto.estado) query.andWhere('rf.estado= :estado', { estado: dto.estado }); 
    if(dto.tipoCargo) query.andWhere('tc.id= :tipoCargo', { tipoCargo: dto.tipoCargo });
    if(dto.cargo) query.andWhere("rf.cargo ILIKE :cargo", { cargo: `%${dto.cargo}%` });
    if(dto.nroIdentificacion) query.andWhere("pn.nroIdentificacion ILIKE :nroId", { nroId: `%${dto.nroIdentificacion}%` });
    if(dto.nombres) query.andWhere("pn.nombres ILIKE :nombres ", { nombres: `%${dto.nombres}%` });
    if(dto.apellidos) query.andWhere("pn.primer_apellido LIKE :apellidos or pn.segundo_apellido ILIKE :apellidos", { apellidos: `%${dto.apellidos}%` });
    if(dto.fechaIngreso) query.andWhere("rf.fecha_ingreso> :fechaIngreso", { fechaIngreso: new Date(dto.fechaIngreso)}); 
    //if(userDto.company&&userDto.company!='APS') query.andWhere('e.codigo= :codigo', { codigo: userDto.company });   
    //if(dto.persona) query.andWhere('rf.id_persona= :id_persona', { id_persona: dto.persona });
    if(dto.tipoEmpresa) query.andWhere('e.id_tipo_empresa= :tipoEmpresa', { tipoEmpresa: dto.tipoEmpresa });
    if(dto.codEmpresa) query.andWhere('e.codigo= :codEmpresa', { codEmpresa: dto.codEmpresa });
    //const isAdministrator=userDto.role.includes('administrador')||userDto.company=='APS'
    //if (!isAdministrator){
    //  if(userDto.company) query.andWhere('e.codigo= :codigo', { codigo: userDto.company });
    //}
    const header = titleHeader
    const data = await query.select(selectReport).getRawMany()
    return {data:data,header:header};
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

  async createOne(userDto: UserDto,dto: createDto) {
    try{
      const empresa :any = await this.serviceEmpresa.getOneByCode(userDto.company);
      dto.empresa= empresa.id
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

  async editOne(id: number, dto: updateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
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

  async deleteOne(id: number) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
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
}